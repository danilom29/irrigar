import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Third-party package
 */
import 'hammerjs';

/**
 * Components
 */
import { CountdownComponent } from './components/countdown/countdown.component';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MenuSidenavComponent } from './components/menu-sidenav/menu-sidenav.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Modules
 */
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatNativeDateModule, MatFormFieldModule } from '@angular/material';

/**
 * Services
 */
import { AuthenticationService } from './services/nodejs/authentication.service';
import { CrudService } from './services/nodejs/crud.service';
import { CalcComponent } from './components/calc/calc.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DialogMessageComponent } from './components/dialog-message/dialog-message.component'; 
import { DialogOverviewComponent } from './components/dialog-overview/dialog-overview.component';
import { DialogAreaComponent } from './components/dialog-area/dialog-area.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatIconModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  exports:[
    CountdownComponent,
    DeleteConfirmComponent, 
    DialogMessageComponent,
    DialogOverviewComponent,
    DialogAreaComponent,
    LoginComponent,
    LogoutComponent,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatAutocompleteModule,
    MatGridListModule,
    MatListModule,
    MenuSidenavComponent,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule,
    TextMaskModule,
    UserRegisterComponent
  ],
  declarations: [
    CountdownComponent,
    DeleteConfirmComponent,
    LoginComponent,
    LogoutComponent,
    MenuSidenavComponent,
    UserRegisterComponent,
    CalcComponent,
    DialogMessageComponent,
    DialogOverviewComponent,
    DialogAreaComponent,
    DialogAreaComponent,
    ForgotPasswordComponent
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    CrudService
  ],
  entryComponents: [
    DeleteConfirmComponent,
    DialogMessageComponent,
    ForgotPasswordComponent,
    DialogOverviewComponent,
    DialogAreaComponent
    
  ]
})
export class SharedModule { }
