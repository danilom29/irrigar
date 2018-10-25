import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { LoginComponent } from './components/login/login.component';

/**
 * Guards
 */
import { AuthGuard } from './modules/shared/guards/auth.guard';
import { UserRegisterComponent } from './modules/main/components/user-register/user-register.component';
import { ProfileComponent } from './modules/shared/components/profile/profile.component';

/**
 * Modules
 */

const routes: Routes = [{
  path: '',
  redirectTo: '/login',
  pathMatch: 'full'
}, {
  path: 'login',
  component: LoginComponent
}, {
  path: 'user-register', 
  component: UserRegisterComponent
},{
  path: 'main',
  loadChildren: './modules/main/main.module#MainModule',
  canActivate: [AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
