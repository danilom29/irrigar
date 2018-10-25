import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

/*Laravel*/
import { environment } from './../../../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export class CrudService {
  errors: any = [];
  headersToAuth: any;
  optionsToAuth: any;
  url = environment.urlToApi;
  public headers:any = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  create = (params) => new Promise((resolve, reject) => { 
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    });

    this.http.post(this.url+'/result',params, this.optionsToAuth)
    .subscribe(res => {
      resolve({
        cod: "c-02",
        message: "Cadastro feito com sucesso"//Cadastro feito com sucesso
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })

  read = (param) => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.get(environment.urlToApi+'/resultados/'+param, this.optionsToAuth)
    .subscribe(res => {
      resolve(res.json());
    },(rej) => resolve(rej));    
  });

  report = (param) => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.post(environment.urlToApi+'/result/report',param, this.optionsToAuth)
    .subscribe(res => {
      resolve(res.json());
    },(rej) => resolve(rej));    
  })

  readCulture = () => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.get(environment.urlToApi+'/result/culturas', this.optionsToAuth)
    .subscribe(res => {
      resolve(res.json());
    },(res) => resolve(res));
  })

  update = (params) => new Promise((resolve, reject) => { 
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http
    .put(this.url+"/user",params, this.optionsToAuth)
    .subscribe(res => {
      resolve({
        cod: "u-03",
        message: "Atualização feita com sucesso"
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })

  findOne = (params) => new Promise((resolve, reject) => {

    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.get(environment.urlToApi+'/user', this.optionsToAuth)
    .subscribe(res => {
      resolve(res.json());
    },(res) => resolve(res));
  })

  deleteAccount = (params) => new Promise((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http
    .delete(this.url+"/user?token="+params, this.optionsToAuth)
    .subscribe(res => {
      resolve({
        cod: "u-03",
        message: "Conta deletada com sucesso"
      });
    }, rej => {
      if(rej['_body']) {
        let json = JSON.parse(rej['_body']);
        reject({
          cod: "error-c-01",
          message: JSON.stringify(json.message)
        })
      } else {
        console.log(rej)
      }
    })
  })

  readCulturas = () => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.get(environment.urlToApi+'/culture', this.optionsToAuth)
    .subscribe(res => {
      resolve(res.json());
    },(res) => resolve(res));
  });

  readEstagios = () => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.get(environment.urlToApi+'/stages', this.optionsToAuth)
    .subscribe(res => {
      resolve(res.json());
    },(res) => resolve(res));
  })

  readValueKc = (params) => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.post(environment.urlToApi+'/kc/value',params.value, this.optionsToAuth)
    .subscribe(res => {
      resolve({
        cod: "c-02",
        message: "Consulta feita com sucesso",
        response: res.json()
      });
    },(res) => resolve(res));
  });

  createValueKc = (params) => new Promise ((resolve, reject) => {
    this.headersToAuth = new Headers({
      'Authorization': sessionStorage.getItem('access_token')
    });

    this.optionsToAuth = new RequestOptions({
      'headers': this.headersToAuth
    })

    this.http.post(environment.urlToApi+'/kc',params, this.optionsToAuth)
    .subscribe(res => {
      resolve({
        cod: "c-02",
        message: "Cadastro feita com sucesso",
        response: res.json()
      });
    },(res) => resolve(res));
  })
}
