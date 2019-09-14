import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { AdminComponent } from './pages/admin/admin.component';

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  canActivate: [AuthGuardService],
  canActivateChild: [AuthGuardService]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
