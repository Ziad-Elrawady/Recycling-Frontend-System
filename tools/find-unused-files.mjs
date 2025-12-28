import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

const projectRoot = process.cwd();

function normalize(p) {
  return path.normalize(p);
}

function toPosix(p) {
  return p.split(path.sep).join('/');
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function walk(dir, { includeExts, excludeDirs }) {
  const out = [];
  const stack = [dir];
  while (stack.length) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const ent of entries) {
      const full = path.join(current, ent.name);
      if (ent.isDirectory()) {
        if (excludeDirs.has(ent.name)) continue;
        stack.push(full);
      } else if (ent.isFile()) {
        const ext = path.extname(ent.name).toLowerCase();
        if (includeExts.has(ext)) out.push(full);
      }
    }
  }
  return out;
}

function loadTsConfig(tsconfigPath) {
  const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
  if (configFile.error) {
    const msg = ts.flattenDiagnosticMessageText(configFile.error.messageText, '\n');
    throw new Error(`Failed to read ${tsconfigPath}: ${msg}`);
  }
  const configDir = path.dirname(tsconfigPath);
  const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, configDir);
  if (parsed.errors?.length) {
    const msg = parsed.errors.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n');
    throw new Error(`Failed to parse ${tsconfigPath}: ${msg}`);
  }
  return parsed;
}

function extractDecoratorAssetRefs(sourceText) {
  // Very small heuristic: find templateUrl/styleUrls/styleUrl in Component decorator.
  // We intentionally keep this regex-based (fast, simple) and rely on imports for TS reachability.
  const refs = [];

  const templateUrlRegex = /templateUrl\s*:\s*['"]([^'\"]+)['"]/g;
  const styleUrlRegex = /styleUrl\s*:\s*['"]([^'\"]+)['"]/g;
  const styleUrlsRegex = /styleUrls\s*:\s*\[([^\]]*)\]/g;
  const stringRegex = /['"]([^'\"]+)['"]/g;

  let m;
  while ((m = templateUrlRegex.exec(sourceText))) refs.push(m[1]);
  while ((m = styleUrlRegex.exec(sourceText))) refs.push(m[1]);

  while ((m = styleUrlsRegex.exec(sourceText))) {
    const inside = m[1];
    let s;
    while ((s = stringRegex.exec(inside))) refs.push(s[1]);
  }

  return refs;
}

function extractDynamicImports(sourceFile) {
  const imports = [];
  function visit(node) {
    // import('...')
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg0 = node.arguments?.[0];
      if (arg0 && ts.isStringLiteralLike(arg0)) imports.push(arg0.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(sourceFile);
  return imports;
}

function resolveModule(specifier, containingFile, compilerOptions, moduleResolutionHost) {
  // Only resolve relative or path-mapped modules. Skip bare node_modules imports.
  const isRelative = specifier.startsWith('./') || specifier.startsWith('../');
  const looksLikePathAlias = specifier.startsWith('@') || specifier.startsWith('src/');
  if (!isRelative && !looksLikePathAlias) return null;

  const resolved = ts.resolveModuleName(specifier, containingFile, compilerOptions, moduleResolutionHost);
  const fileName = resolved?.resolvedModule?.resolvedFileName;
  if (!fileName) return null;

  // Ignore d.ts and node_modules resolutions
  if (fileName.includes(`${path.sep}node_modules${path.sep}`)) return null;
  if (fileName.endsWith('.d.ts')) return null;

  return normalize(fileName);
}

function main() {
  const tsconfigAppPath = path.join(projectRoot, 'tsconfig.app.json');
  const parsed = loadTsConfig(tsconfigAppPath);

  const compilerOptions = {
    ...parsed.options,
    // Make sure we can walk JS-less graph quickly.
    allowJs: false,
    skipLibCheck: true,
  };

  const moduleResolutionHost = {
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    directoryExists: ts.sys.directoryExists,
    getCurrentDirectory: ts.sys.getCurrentDirectory,
    getDirectories: ts.sys.getDirectories,
    realpath: ts.sys.realpath,
  };

  const srcRoot = path.join(projectRoot, 'src');
  const allTs = walk(srcRoot, {
    includeExts: new Set(['.ts']),
    excludeDirs: new Set(['node_modules', 'dist', '.angular', '.git']),
  });
  const allOther = walk(srcRoot, {
    includeExts: new Set(['.html', '.css', '.scss', '.sass']),
    excludeDirs: new Set(['node_modules', 'dist', '.angular', '.git']),
  });

  const allFiles = new Set([...allTs, ...allOther].map(normalize));

  const entry = normalize(path.join(srcRoot, 'main.ts'));
  if (!fs.existsSync(entry)) throw new Error(`Entry not found: ${entry}`);

  // Also treat Angular CLI build entry files as roots (index.html, global styles, scripts).
  const angularJsonPath = path.join(projectRoot, 'angular.json');
  const angularJson = fs.existsSync(angularJsonPath) ? readJson(angularJsonPath) : null;

  const rootFiles = new Set([entry]);
  if (angularJson?.projects) {
    const defaultProject = angularJson.defaultProject || Object.keys(angularJson.projects)[0];
    const project = angularJson.projects?.[defaultProject];
    const build = project?.architect?.build || project?.targets?.build;
    const options = build?.options;
    const addOptionPath = (value) => {
      if (!value) return;
      if (typeof value === 'string') {
        rootFiles.add(normalize(path.resolve(projectRoot, value)));
        return;
      }
      if (typeof value === 'object' && typeof value.input === 'string') {
        rootFiles.add(normalize(path.resolve(projectRoot, value.input)));
      }
    };

    addOptionPath(options?.index);
    addOptionPath(options?.main);
    addOptionPath(options?.polyfills);

    if (Array.isArray(options?.styles)) {
      for (const s of options.styles) addOptionPath(s);
    }
    if (Array.isArray(options?.scripts)) {
      for (const s of options.scripts) addOptionPath(s);
    }
  }

  const queue = [];
  const reachable = new Set();

  function mark(filePath) {
    const n = normalize(filePath);
    if (reachable.has(n)) return;
    reachable.add(n);
    if (path.extname(n).toLowerCase() === '.ts') queue.push(n);
  }

  // seed roots
  for (const rf of rootFiles) {
    if (fs.existsSync(rf)) mark(rf);
  }

  while (queue.length) {
    const filePath = queue.pop();

    if (!fs.existsSync(filePath)) continue;
    const ext = path.extname(filePath).toLowerCase();
    if (ext !== '.ts') continue;

    const sourceText = fs.readFileSync(filePath, 'utf8');

    // Angular template/style refs
    const assetRefs = extractDecoratorAssetRefs(sourceText);
    for (const ref of assetRefs) {
      if (!ref || ref.startsWith('http://') || ref.startsWith('https://')) continue;
      const resolvedAsset = normalize(path.resolve(path.dirname(filePath), ref));
      if (allFiles.has(resolvedAsset)) reachable.add(resolvedAsset);
    }

    const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.ES2022, true);

    // Static imports/exports
    for (const stmt of sourceFile.statements) {
      if (ts.isImportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteralLike(stmt.moduleSpecifier)) {
        const resolved = resolveModule(stmt.moduleSpecifier.text, filePath, compilerOptions, moduleResolutionHost);
        if (resolved) mark(resolved);
      }
      if (ts.isExportDeclaration(stmt) && stmt.moduleSpecifier && ts.isStringLiteralLike(stmt.moduleSpecifier)) {
        const resolved = resolveModule(stmt.moduleSpecifier.text, filePath, compilerOptions, moduleResolutionHost);
        if (resolved) mark(resolved);
      }
    }

    // Dynamic imports (loadComponent/loadChildren patterns)
    for (const spec of extractDynamicImports(sourceFile)) {
      const resolved = resolveModule(spec, filePath, compilerOptions, moduleResolutionHost);
      if (resolved) mark(resolved);
    }
  }

  const potentiallyUnused = [...allFiles]
    .filter(f => !reachable.has(f))
    .sort((a, b) => a.localeCompare(b));

  const rel = p => toPosix(path.relative(projectRoot, p));

  const result = {
    generatedAt: new Date().toISOString(),
    entrypoints: [...rootFiles].filter(p => fs.existsSync(p)).map(rel).sort(),
    totals: {
      allFiles: allFiles.size,
      reachable: reachable.size,
      potentiallyUnused: potentiallyUnused.length,
    },
    potentiallyUnused: potentiallyUnused.map(rel),
  };

  const outDir = path.join(projectRoot, 'tools', 'reports');
  fs.mkdirSync(outDir, { recursive: true });

  fs.writeFileSync(path.join(outDir, 'unused-files.json'), JSON.stringify(result, null, 2));

  const prodUnused = result.potentiallyUnused.filter(p => !p.endsWith('.spec.ts'));
  const specUnused = result.potentiallyUnused.filter(p => p.endsWith('.spec.ts'));

  const md = [
    `# Unused files report`,
    ``,
    `Generated: ${result.generatedAt}`,
    `Entrypoint: ${result.entrypoints.join(', ')}`,
    ``,
    `Totals:`,
    `- All scanned files: ${result.totals.allFiles}`,
    `- Reachable from entry: ${result.totals.reachable}`,
    `- Potentially unused: ${result.totals.potentiallyUnused}`,
    ``,
    `## Potentially unused (non-test)`,
    ...prodUnused.map(p => `- ${p}`),
    ``,
    `## Potentially unused (*.spec.ts)`,
    ...specUnused.map(p => `- ${p}`),
    ``,
    `## Notes`,
    `- This is a static reachability analysis from \`src/main.ts\` based on TS imports + Angular \`templateUrl/styleUrl(s)\`.`,
    `- Files can be false-positives if referenced indirectly (e.g. loaded by string, assets referenced only in runtime HTML/CSS, test setup, tooling).`,
  ].join('\n');

  fs.writeFileSync(path.join(outDir, 'unused-files.md'), md);

  console.log(`Wrote reports:`);
  console.log(`- ${toPosix(path.relative(projectRoot, path.join(outDir, 'unused-files.md')))}`);
  console.log(`- ${toPosix(path.relative(projectRoot, path.join(outDir, 'unused-files.json')))}`);
  console.log('');
  console.log(`Potentially unused: ${result.totals.potentiallyUnused}`);
}

main();
