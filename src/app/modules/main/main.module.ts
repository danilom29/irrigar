import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Components
 */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';

/**
 * Modules
 */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from './../shared/shared.module';
import { ProfileComponent } from '../shared/components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent, 
    MainComponent, ProfileComponent
  ]
})
export class MainModule { }
