import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

import { CustomMaterialModule } from './custom-material/custom-material.module';

import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const ExportedComponents = [
  ProgressSpinnerComponent,
  SideMenuComponent,
  NavbarComponent
];

@NgModule({
  declarations: [
    ...ExportedComponents
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    CustomMaterialModule
  ],
  exports: [
    ...ExportedComponents
  ]
})
export class SharedModule { }
