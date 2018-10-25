import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/nodejs/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authentication: AuthenticationService,
    private matsnackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email,Validators.maxLength(191)])
    })
  }

  enviar = () => {
    this.authentication.enviarEmail(this.loginForm.value).then(res => {
      let retorno:any = res;
      this.dialogRef.close();
      if(retorno.ret){
        this.matsnackbar.open("Senha enviada ao e-mail cadastrado.", '', {
          duration: 3000,
          panelClass:["success-snackbar","mat-snack-bar-handset"]
        });   
      }else{
        this.matsnackbar.open("Erro ao enviar e-mail.", '', {
          duration: 3000,
          panelClass:["error-snackbar","mat-snack-bar-handset"]
        });   
      }
    },rej =>{
      this.dialogRef.close();
      this.matsnackbar.open("Erro ao recuperar senha.", '', {
        duration: 3000,
        panelClass:["error-snackbar","mat-snack-bar-handset"]
      }); 
    })
  }

}
