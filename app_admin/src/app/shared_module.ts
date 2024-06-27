import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ],
  exports: [
    CommonModule
  ]
})
export class SharedModule { }
