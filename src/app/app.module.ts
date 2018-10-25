import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
// import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

/**
 * Modules
 */
import { SharedModule } from './modules/shared/shared.module';

/**
 * Routing
 */
import { AppRoutingModule } from './app-routing.module';
import { UserRegisterComponent } from './modules/main/components/user-register/user-register.component';
import { ProfileComponent } from './modules/shared/components/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserRegisterComponent
  ],
  imports: [
    AppRoutingModule,
    
    BrowserAnimationsModule,
    HttpModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
