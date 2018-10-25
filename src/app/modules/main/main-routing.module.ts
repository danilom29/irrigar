import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
/**
 * Components
 */
import { MainComponent } from './main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { CalcComponent } from '../shared/components/calc/calc.component';
import { ProfileComponent } from '../shared/components/profile/profile.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [{
    path: '',
    redirectTo: 'calc',
    pathMatch: 'full'
  }, { 
    path: 'dashboard', 
    component: DashboardComponent 
  }, { 
    path: 'dashboard/:id', 
    component: DashboardComponent 
  }, {
    path: 'profile',
    component: ProfileComponent
  }, {
    path: 'calc',
    component: CalcComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
 }
