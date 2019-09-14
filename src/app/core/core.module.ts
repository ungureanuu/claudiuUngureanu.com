import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { API_URLS, apiUrls } from './repositories/api-urls.constant';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    { provide: API_URLS, useValue: apiUrls }
  ]
})
export class CoreModule { }
