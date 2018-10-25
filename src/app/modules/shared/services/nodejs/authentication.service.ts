import { Injectable, Component, Inject } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/**
 * Settings
 */
import { environment } from './../../../../../environments/environment';

/**
 * Others libraries
 */
import { Observable } from 'rxjs';
import 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CrudService } from './crud.service';


@Injectable()
export class AuthenticationService {
  headersToAuth: Headers;
  optionsToAuth: RequestOptions;
  urlToApi = environment.urlToApi;

  constructor(
    private http: Http,
    private router: Router,
    private _crud: CrudService,
    public dialog: MatDialog
  ) { }

  login = (params) => new Promise((resolve, reject) => {
    let temp; 
    this.headersToAuth = new Headers({
      'Content-Type': 'application/json' 
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http
    .post(this.urlToApi+'/token',{"email": params.email,"password": params.password},this.optionsToAuth)
    .subscribe(res => { 
      if(res.ok) {
        temp = JSON.parse(res['_body']);

        sessionStorage.setItem('access_token', 'JWT '+temp.token);
        sessionStorage.setItem('email', params.email);
        let param = {"decrypt_password": params.password,"email": params.email,"password": params.password}
        this._crud.update(param)
        .then(res => { 
          console.log(res)
        }, rej => {
          console.log(rej)
        })

        resolve({
          status: res.status,
          message: "Login feito com sucesso"
        });
      }
    }, err => {
      if(err.statusText == "Unauthorized") {
        resolve({
          cod:"le-01",
          message: "O e-mail ou senha informado(s) não foi(ram) encontrado(s)."
        })
      }
    })
  })
  
  signup = (params) => new Promise((resolve, reject) => {
    var resposta = params; 
    this.http.post(this.urlToApi+'/users',resposta,{headers: this.headersToAuth})
    .subscribe(res => {
      resolve({
        cod: "c-02",
        message: "Cadastro feito com sucesso"//Cadastro feito com sucesso
      }); 
      this.router.navigate(['/']);
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        });

      } else {
        console.log(rej)
      }
    })
  });

  enviarEmail = (params) => new Promise((resolve, reject) => {
    var resposta = params; 
    this.http.post(this.urlToApi+'/users/email',resposta,{headers: this.headersToAuth})
    .subscribe(res => {
      resolve(res.json());
    },(rej) => resolve(rej));  
  })

}

