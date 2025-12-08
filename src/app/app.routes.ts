import { Routes } from '@angular/router';
import { AdminNavbarComponent } from './features/admin/admin-navbar/admin-navbar';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard';
import { ManageMaterialsComponent } from './features/admin/manage-materials/manage-materials';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ManageFactoriesComponent } from './features/admin/manage-factories/manage-factories';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users';
import { ManageOrdersComponent } from './features/admin/manage-orders/manage-orders';
import { RewardsComponent } from './features/admin/rewards/rewards';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password';
import { ResetPasswordComponent } from './features/auth/reset-password/reset-password';
import { Citizen } from './features/citizen/citizen';
import { CollectorDashboard } from './features/collector/collector-dashboard/collector-dashboard';
import { adminGuard } from './core/guards/admin/admin-guard';
import { ConfirmEmailComponent } from './features/auth/confirm-email/confirm-email';
import { RegisterSuccessComponent } from './features/auth/register-success/register-success';
import { HomeComponent } from './features/home/home';
import { citizenGuard } from './core/guards/citizin/citizen-guard';
import { collectorGuard } from './core/guards/collector/collector-guard';

export const routes: Routes = [

  // 🟢 Home Page
  { path: '', component: HomeComponent },

  // 🟢 Auth Pages
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'register-success', component: RegisterSuccessComponent },

  // 🔵 Admin Pages with Guard
  {
    path: 'admin',
    canActivate: [adminGuard],
    component: AdminNavbarComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'materials', component: ManageMaterialsComponent },
      { path: 'factories', component: ManageFactoriesComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'orders', component: ManageOrdersComponent },
      { path: 'rewards', component: RewardsComponent }
    ]
  },

  // 🟡 Citizen Page
  { path: 'citizen', component: Citizen },

  // 🟡 Collector Page
  { path: 'collector', component: CollectorDashboard },
// // 🟡 Citizen Page
// { path: 'citizen', component: Citizen, canActivate: [citizenGuard] },

// // 🟡 Collector Page
// { path: 'collector', component: CollectorDashboard, canActivate: [collectorGuard] },

  // 🚨 Fallback — Any Wrong URL → Go Home
  { path: '**', redirectTo: '' }
];
