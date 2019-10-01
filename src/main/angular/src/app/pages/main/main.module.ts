import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [MainComponent, DashboardComponent],
  imports: [
    FormsModule,
    HttpClientModule,
    CommonModule,
    ComponentsModule,
    MainRoutingModule
  ]
})
export class MainModule { }
