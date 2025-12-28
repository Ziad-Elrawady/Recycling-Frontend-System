# Unused files report

Generated: 2025-12-28T17:38:30.730Z
Entrypoint: src/index.html, src/main.ts, src/styles.css

Totals:
- All scanned files: 205
- Reachable from entry: 147
- Potentially unused: 58

## Potentially unused (non-test)
- src/app/app.config.ts
- src/app/core/guards/auth/auth-guard.ts
- src/app/core/models/history-reward.model.ts
- src/app/core/models/order-material.model.ts
- src/app/core/models/user.model.ts
- src/app/core/services/admin.service.ts
- src/app/core/services/points.service.ts
- src/app/core/utils/custom-preloading.strategy.ts
- src/app/core/utils/performance.util.ts
- src/app/core/utils/utils.ts
- src/app/core/utils/validators.util.ts
- src/app/features/collector/collector-dashboard/stats-cards/stats-cards.component.css
- src/app/features/collector/collector-dashboard/stats-cards/stats-cards.component.html
- src/app/features/collector/collector-dashboard/stats-cards/stats-cards.component.ts
- src/app/features/home/features/features.component.css
- src/app/features/home/features/features.component.html
- src/app/features/home/features/features.component.ts
- src/app/features/home/home.css
- src/app/features/home/home.html
- src/app/features/home/home.ts
- src/app/shared/ui/badge-display/badge-display.component.ts
- src/app/shared/ui/point-history-item/point-history-item.component.ts

## Potentially unused (*.spec.ts)
- src/app/app.spec.ts
- src/app/core/guards/admin/admin-guard.spec.ts
- src/app/core/guards/auth/auth-guard.spec.ts
- src/app/core/guards/citizin/citizen-guard.spec.ts
- src/app/core/guards/collector/collector-guard.spec.ts
- src/app/core/interceptors/auth-interceptor.spec.ts
- src/app/core/services/admin-citizen.spec.ts
- src/app/core/services/auth.spec.ts
- src/app/core/services/citizen.spec.ts
- src/app/core/services/collector.spec.ts
- src/app/core/services/factory.spec.ts
- src/app/core/services/flash-message.service.spec.ts
- src/app/core/services/language.service.spec.ts
- src/app/core/services/material.spec.ts
- src/app/core/services/order.spec.ts
- src/app/core/services/points.spec.ts
- src/app/core/services/reward.spec.ts
- src/app/core/services/theme.service.spec.ts
- src/app/core/services/user-profile.service.spec.ts
- src/app/features/admin/add-collector/add-collector.spec.ts
- src/app/features/admin/dashboard/dashboard.spec.ts
- src/app/features/admin/manage-collectors/manage-collectors.spec.ts
- src/app/features/admin/manage-factories/manage-factories.spec.ts
- src/app/features/admin/manage-materials/manage-materials.spec.ts
- src/app/features/admin/manage-orders/manage-orders.spec.ts
- src/app/features/admin/manage-users/manage-users.spec.ts
- src/app/features/admin/reward-management/reward-management.spec.ts
- src/app/features/auth/confirm-email/confirm-email.spec.ts
- src/app/features/auth/forgot-password/forgot-password.spec.ts
- src/app/features/auth/login/login.spec.ts
- src/app/features/auth/register-success/register-success.spec.ts
- src/app/features/auth/register/register.spec.ts
- src/app/features/auth/reset-password/reset-password.spec.ts
- src/app/features/citizen/rewards/rewards.component.spec.ts
- src/app/features/flash-message/flash-message/flash-message.spec.ts
- src/app/features/home/home.spec.ts

## Notes
- This is a static reachability analysis from `src/main.ts` based on TS imports + Angular `templateUrl/styleUrl(s)`.
- Files can be false-positives if referenced indirectly (e.g. loaded by string, assets referenced only in runtime HTML/CSS, test setup, tooling).