# Recycling Frontend System

منصة إدارة نظام جمع وإعادة تدوير النفايات - النسخة الأمامية

**Recycling Frontend System** - نظام متقدم لإدارة عمليات جمع وإعادة تدوير النفايات مع واجهة مستخدم حديثة وتجربة مستخدم محسّنة.

## 🌟 الميزات الرئيسية:

- ✅ **Angular 20** - أحدث إصدار من Angular مع أحدث الميزات
- ✅ **Standalone Components** - مكونات مستقلة وقابلة لإعادة الاستخدام
- ✅ **Angular Signals** - إدارة الحالة بكفاءة عالية
- ✅ **Tailwind CSS** - تصميم احترافي ومتجاوب
- ✅ **Reactive Forms** - نماذج تفاعلية قوية مع التحقق
- ✅ **Lazy Loading** - تحميل ذكي للصفحات لتحسين الأداء
- ✅ **دعم متعدد اللغات** - عربي وإنجليزي مع RTL/LTR
- ✅ **Responsive Design** - يعمل على جميع الأجهزة والشاشات

## 👥 أنظمة الأدوار المدعومة:

- **المواطن (Citizen)** - إنشاء طلبات جمع النفايات والتتبع والحصول على المكافآت
- **جامع النفايات (Collector)** - قبول الطلبات والتوجيه والمجموعات
- **المسؤول (Admin)** - إدارة النظام والمستخدمين والإحصائيات

## 📦 الخدمات والمكونات:

### Core Services:
- **`AuthService`** - إدارة المصادقة وتسجيل الدخول
- **`UserService`** - إدارة بيانات المستخدم والأدوار
- **`DataService`** - التواصل مع API الخادم
- **`ThemeService`** - إدارة الوضع الفاتح/الداكن
- **`LanguageService`** - إدارة اللغات والترجمات
- **`NotificationService`** - إدارة الإشعارات والرسائل
- **`FlashMessageService`** - رسائل سريعة التغذية

### UI Components:
- **ButtonComponent** - مكون زر مخصص
- **CardComponent** - مكونات بطاقات
- **BadgeComponent** - شارات الحالة
- **TabsComponent** - نظام التبويبات
- **RequestCard** - بطاقة طلب النفايات
- **StatCard** - بطاقات الإحصائيات
- **MapContainer** - حاوية الخرائط

### Features Pages:
- 🏠 **Landing Page** - صفحة الهبوط والترحيب
- 🔐 **Authentication** - تسجيل الدخول والتسجيل والتحقق من البريد
- 📊 **Citizen Dashboard** - لوحة تحكم المواطن مع الإحصائيات والطلبات
- 📍 **Collector Dashboard** - لوحة تحكم الجامع مع الخريطة والطلبات النشطة
- 🛡️ **Admin Dashboard** - لوحة تحكم إدارية متقدمة
- 📋 **My Requests** - إدارة الطلبات الشخصية
- 👤 **Profile** - صفحة الملف الشخصي والإعدادات
- 🔔 **Notifications** - مركز الإشعارات الشاملة
- 🎁 **Rewards** - نظام المكافآت والنقاط
- ⚙️ **Settings** - إعدادات التطبيق والحساب
- ❌ **404 Error** - صفحة خطأ 404 مخصصة

## 🚀 البدء السريع:

### المتطلبات الأساسية:
- **Node.js** (الإصدار 18 أو أحدث)
- **npm** أو **yarn**
- **Angular CLI** (اختياري)

### 1. تثبيت الحزم:
```bash
npm install
```

### 2. تشغيل المشروع بيئة التطوير:
```bash
npm start
```

أو باستخدام Angular CLI:
```bash
ng serve --port 4200
```

### 3. فتح المتصفح:
افتح المتصفح على: **http://localhost:4200**

### 4. بناء المشروع للإنتاج:
```bash
npm run build
```

أو:
```bash
ng build
```

## 📦 الحزم والمكتبات المستخدمة:

### Dependencies الرئيسية:
| الحزمة | الإصدار | الوصف |
|--------|--------|--------|
| `@angular/core` | ^20.0.0 | Core Angular Framework |
| `@angular/common` | ^20.0.0 | Common Angular utilities |
| `@angular/router` | ^20.0.0 | Angular routing |
| `@angular/forms` | ^20.0.0 | Reactive forms |
| `rxjs` | ^7.0.0 | Reactive programming |
| `tailwindcss` | ^3.0.0 | CSS framework |
| `clsx` | ^2.0.0 | Class names utility |
| `date-fns` | ^3.0.0 | Date utilities |
| `recharts` | ^2.0.0 | Charts library |

### DevDependencies:
- `@angular/cli` - Angular CLI
- `typescript` - TypeScript compiler
- `tailwindcss` - Tailwind CSS
- `autoprefixer` - CSS vendor prefixes
- `postcss` - CSS processor

## 🎨 الميزات المتقدمة:

### 1. نظام اللغات (Internationalization):
```
العربية (RTL) ✅
الإنجليزية (LTR) ✅
تبديل لحظي بين اللغات
حفظ التفضيلات في localStorage
```

### 2. نظام المواضيع (Theme System):
```
الوضع الفاتح (Light Mode) ✅
الوضع الداكن (Dark Mode) ✅
تبديل سلس وبدون تأخير
حفظ الإعدادات المفضلة
```

### 3. نظام المصادقة (Authentication):
- تسجيل دخول آمن
- تسجيل حساب جديد
- استرجاع كلمة المرور
- التحقق من البريد الإلكتروني
- دعم token-based authentication
- guards للمسارات المحمية

### 4. نظام إدارة الأدوار (Role Management):
- ثلاثة أدوار أساسية (Citizen, Collector, Admin)
- إمكانية تبديل الأدوار
- أذونات مختلفة لكل دور
- حماية المسارات حسب الدور

### 5. نظام الإشعارات (Notifications):
- إشعارات في الوقت الفعلي
- عداد الإشعارات غير المقروءة
- أنواع مختلفة من الإشعارات
- حفظ سجل الإشعارات

### 6. نظام المكافآت (Rewards System):
- نقاط المكافآت
- سجل النقاط
- مستويات العضوية

## 📁 هيكل المشروع:

```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── config/              # API configuration
│   │   ├── guards/              # Route guards
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── models/              # Data models
│   │   ├── services/            # Core services
│   │   └── utils/               # Utility functions
│   │
│   ├── features/                # Feature modules
│   │   ├── admin-dashboard/     # Admin dashboard
│   │   ├── auth/                # Authentication
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── confirm-email/
│   │   │   ├── forgot-password/
│   │   │   ├── reset-password/
│   │   │   └── role-selection/
│   │   ├── citizen-dashboard/   # Citizen dashboard
│   │   │   ├── collection-request/
│   │   │   ├── header/
│   │   │   ├── recent-requests/
│   │   │   └── stats-cards/
│   │   ├── collector-dashboard/ # Collector dashboard
│   │   │   ├── active-route/
│   │   │   ├── available-requests/
│   │   │   ├── header/
│   │   │   ├── map-requests/
│   │   │   ├── recent-collections/
│   │   │   ├── requests-map/
│   │   │   └── stats-cards/
│   │   ├── landing/             # Landing page
│   │   ├── notifications/       # Notifications page
│   │   ├── profile/             # User profile
│   │   ├── requests/            # Requests management
│   │   ├── rewards/             # Rewards page
│   │   ├── settings/            # Settings page
│   │   └── errors/              # Error pages
│   │
│   ├── shared/                  # Shared components
│   │   ├── components/          # Reusable components
│   │   │   ├── create-collection-modal/
│   │   │   ├── flash-messages/
│   │   │   ├── map-container/
│   │   │   ├── navbar/
│   │   │   └── user-menu-dropdown/
│   │   └── ui/                  # UI components library
│   │       ├── badge/
│   │       ├── badge-display/
│   │       ├── button/
│   │       ├── card/
│   │       ├── point-history-item/
│   │       ├── request-card/
│   │       ├── stat-card/
│   │       └── tabs/
│   │
│   ├── app.component.ts         # Root component
│   ├── app.routes.ts            # Route configuration
│   └── app.component.ts
│
├── assets/                      # Static assets
├── styles.css                   # Global styles
├── index.html                   # Main HTML
└── main.ts                      # Application entry
```

## 🔧 التكوينات الهامة:

| ملف | الوصف |
|-----|--------|
| `angular.json` | تكوين Angular CLI والبناء |
| `tsconfig.json` | إعدادات TypeScript الرئيسية |
| `tsconfig.app.json` | إعدادات TypeScript للتطبيق |
| `tsconfig.spec.json` | إعدادات TypeScript للاختبارات |
| `tailwind.config.ts` | تكوين Tailwind CSS |
| `postcss.config.js` | تكوين PostCSS |
| `package.json` | الحزم والمشاريع |

## 🔐 الأمان والحماية:

- ✅ HTTP Interceptors للتحكم في الطلبات
- ✅ Route Guards للحماية من الوصول غير المصرح
- ✅ Secure token storage
- ✅ CSRF protection support
- ✅ Input validation and sanitization
- ✅ Rate limiting support

## ⚡ أداء وتحسينات:

- ✅ Lazy Loading للمسارات
- ✅ Component lazy loading
- ✅ Change Detection optimization
- ✅ CSS minification
- ✅ JavaScript bundling and minification
- ✅ Image optimization support

## 📊 Git Workflow:

```bash
# استنساخ المستودع
git clone <repository-url>

# إنشاء فرع جديد
git checkout -b feature/your-feature-name

# Commit التغييرات
git commit -m "Add your commit message"

# Push الفرع
git push origin feature/your-feature-name

# إنشاء Pull Request
```

## 🧪 الاختبار:

### Unit Tests:
```bash
ng test
```

### E2E Tests:
```bash
ng e2e
```

## 📚 المراجع والموارد:

- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [RxJS Documentation](https://rxjs.dev/)

## 🤝 المساهمة (Contributing):

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المستودع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push إلى الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## 📄 الترخيص:

هذا المشروع مرخص تحت [MIT License](LICENSE)

## 📞 التواصل والدعم:

للأسئلة والاقتراحات والدعم:
- 📧 البريد الإلكتروني: [أضف بريدك هنا]
- 🐛 Report Issues: استخدم [GitHub Issues](../../issues)
- 💬 Discussions: استخدم [GitHub Discussions](../../discussions)

## 🏆 الفريق:

تم تطوير هذا المشروع بواسطة فريق التطوير المتخصص في حلول إعادة التدوير الذكية.

---

<div align="center">

### ✨ شكراً لاستخدامك Recycling Frontend System ✨

**Built with ❤️ using Angular 20**

</div>
