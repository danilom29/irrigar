import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Services
 */
import { AuthenticationService } from './../../services/nodejs/authentication.service';
import { CrudService } from '../../services/nodejs/crud.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';


@Component({
  selector: 'bonamondo-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  @Input() params;

  errors: any = [];
  

  userRegisterForm: FormGroup;
  paramsToTableData: any;
  title: string;
  alterPassword: boolean = false;

  constructor(
    private authentication: AuthenticationService,
    private crud: CrudService,
    public matsnackbar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  /**
   * Cycle hook actions start
   */
  ngOnInit() { 

    this.userRegisterForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
      
    });

    if(sessionStorage.getItem('access_token')){
      this.alterPassword = true;
      this.userRegisterForm.controls.password.setValidators(null);
      this.getDadosProfile(sessionStorage.getItem('access_token'));
    }
  }
  /**
   * Cycle hook actions end
   */ 
  user: any;
  getDadosProfile = (params) => {
    this.crud.findOne(params)
    .then(res => { 
      this.user = res;
      this.userRegisterForm.controls['name'].setValue(this.user.name);
      this.userRegisterForm.controls['email'].setValue(this.user.email);
      // this.userRegisterForm.controls['password'].setValue(this.user.password);
    }, rej => {
      this.matsnackbar.open(rej['message'], '', {
        duration: 3000,
        panelClass:["mat-snack-bar-handset"]
      })
    })
  }

  onUserRegisterFormSubmit = () => { 
    let params = {
      email: this.userRegisterForm.get('email').value.trim().toLowerCase(),
      password: this.userRegisterForm.get('password').value,
      decrypt_password: this.userRegisterForm.get('password').value,
      name: this.userRegisterForm.get('name').value
    }

    if(sessionStorage.getItem('access_token')){ 
      this.crud.update(params)
      .then(res => { 
        this.matsnackbar.open(res['message'], '', {
          duration: 3000,
          panelClass:["success-snackbar","mat-snack-bar-handset"]
        })
      }, rej => {
        this.matsnackbar.open(rej['message'], '', {
          duration: 3000,
          panelClass:["error-snackbar","mat-snack-bar-handset"]
        })
      })
    }else{ 
      this.authentication.signup(params)
      .then(res => {
        this.matsnackbar.open(res['message'], '', {
          duration: 3000,
          panelClass:["success-snackbar","mat-snack-bar-handset"]
        })
      }, rej => {
        this.matsnackbar.open(rej['message'], '', {
          duration: 3000,
          panelClass:["error-snackbar","mat-snack-bar-handset"]
        });
      })
    }
  
    this.userRegisterForm.patchValue(this.userRegisterForm.value); 
    
  }
}
