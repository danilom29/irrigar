import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

/**Services */
import { AuthenticationService } from './../../services/nodejs/authentication.service';

/**
 * Components
 */
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'bonamondo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Input() params;

  errors = [];
  loginForm: FormGroup;
  imageTitle: string;

  constructor(
    private authentication: AuthenticationService,
    public dialog: MatDialog,
    private matsnackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    if(this.params) {
      if(!this.params.routeAfterLoggedIn) {
        this.errors.push({
          cod: 'bonamondo-l-01',
          message: "Definir rota do login"
        });
      }
    } else {
      this.errors.push({
        cod: 'p-01',
        message: "Definir parâmetros mínimos do componente"
      });
    }

    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email,Validators.maxLength(191)]),
      'password': new FormControl(null, [Validators.required,Validators.maxLength(191)])
    })
  }

  onSubmit = () => { 
    let params = {
      "email": this.loginForm.get('email').value.trim().toLowerCase(),
      "password": this.loginForm.get('password').value
    }
    this.authentication.login(params)
    .then(res => {
      let string = JSON.stringify(res);
      let json = JSON.parse(string); 
      if(json.status == 200) {
        this.matsnackbar.open(json.message, '', {
          duration: 3000,
          panelClass:["success-snackbar","mat-snack-bar-handset"]
        });        
        this.router.navigate(this.params.routeAfterLoggedIn);
      }else{
        this.matsnackbar.open(json.message, '', {
          duration: 3000,
          panelClass:["error-snackbar","mat-snack-bar-handset"]

        });   
      }
    })
    .catch(error => { console.log(error)
      this.matsnackbar.open("Sistema fora do ar.", '', {
        duration: 3000,
        panelClass:["error-snackbar","mat-snack-bar-handset"]
      });    
      
      return error;
    });
  }

  openCadastro= () => {
    this.router.navigate(['/user-register']);
  }

  forgotPassword = () => {
    let dialogRef = this.dialog.open(ForgotPasswordComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigate(['/login']);
    });
  }

  openDialog(param): void {
    let dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '250px',
      data: {msg: param.message}
    });

    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
}