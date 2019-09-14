import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './pages/login/login.component';

import { CustomMaterialModule } from '../shared/custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const Components = [
  LoginComponent
];

@NgModule({
  declarations: [
    ...Components
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    CustomMaterialModule
  ]
})
export class AuthModule { }
