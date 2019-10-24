import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'users',
    loadChildren: './modules/user/user.module#UserModule'
  },
  {
    path: 'admin',
    loadChildren: './modules/admin/admin.module#AdminModule'
  },
  {
    path: 'login',
    loadChildren: './modules/authentication/auth.module#AuthModule'
  },
  { 
    path: 'dashboard', 
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
