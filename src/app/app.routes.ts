import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout';
import { AdminDashboardComponent } from './features/admin/dashboard/dashboard';
import { ManageMaterialsComponent } from './features/admin/manage-materials/manage-materials';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { ManageFactoriesComponent } from './features/admin/manage-factories/manage-factories';
import { ManageUsersComponent } from './features/admin/manage-users/manage-users';
import { OrdersApprovalComponent } from './features/admin/orders-approval/orders-approval';
import { RewardsComponent } from './features/admin/rewards/rewards';
import { CollectorDashboard } from './features/collector/collector-dashboard/collector-dashboard';

export const routes: Routes = [
{ path: '', redirectTo: '/collector-dashboard', pathMatch: 'full' },

{
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'materials', component: ManageMaterialsComponent },
      { path: 'factories', component: ManageFactoriesComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'orders', component: OrdersApprovalComponent },
      { path: 'rewards', component: RewardsComponent },
    ]
  },

  {
    path: 'collector-dashboard',
    component: CollectorDashboard
  },

  // صفحة اللوجين والريفجيستر العاديين
  { path: 'login', component:LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'admin/dashboard' }
];
