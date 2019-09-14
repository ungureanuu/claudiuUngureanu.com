import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';

import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';

const ExportedComponents = [
  ProgressSpinnerComponent
];

@NgModule({
  declarations: [
    ...ExportedComponents
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    ...ExportedComponents
  ]
})
export class SharedModule { }
