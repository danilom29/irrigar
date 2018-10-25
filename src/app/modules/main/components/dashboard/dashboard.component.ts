import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe, DatePipe } from '@angular/common';
declare var cordova:any;
/**
 * Services
 */
import { CrudService } from './../../../shared/services/nodejs/crud.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DeleteConfirmComponent } from '../../../shared/components/delete-confirm/delete-confirm.component';
import { environment } from './../../../../../environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @Input() params;   
  url = environment;
  public length = 0;
  public lengthCulture = 0;
  public arraySource: any = [];
  culturaForm: FormGroup;
  loading:boolean = false;
  color = 'primary';
  mode = 'indeterminate';
  diameter = 5;
  public progress = true;
  public arrayCulture: any;
  public titulo = "Início"
  constructor(
    private crud: CrudService,
    public dialog: MatDialog,
    private matsnackbar: MatSnackBar,
    private router: Router
  ) { 
    this.readDataCulture();
    this.readData(0); 
   }

  ngAfterViewInit() {
    this.titulo = "Início";
    document.querySelector('body').classList.add('fundo-dash');
  }
  
  ngOnChanges() {
    // this.readDataCulture();
    // this.readData(0);
  }

  ngOnInit() { 
    this.readDataCulture();
    this.readData(0);

    this.culturaForm = new FormGroup({
      'id': new FormControl(null, [Validators.required])      
    });

  }

  readData = (param) => {
    this.crud.read(param).then(res => { 
      this.arraySource = res;
      if(this.arraySource.length > 0){
        this.loading = true;
      }
      this.progress = false;
    },rej =>{
      this.progress = false;
    })
  }

  
  readDataCulture = () => {
    this.crud.readCulture().then(res => {      
      this.arrayCulture = res;
    },rej => {
      console.log(rej)
    })
  }

  print(type){
    this.progress = true;
    let email = sessionStorage.getItem('email');
		let rotaInterna = this.url.rotaInterna;
		let phantom = {
      rotaInterna: rotaInterna,
			name:"relatorio-resultados_" + email,
			tipoPDF: "report"
		}
    let param = {
      data: this.arraySource,
      email: email,
      type: type,
      phantom: phantom
    }
    
    this.crud.report(param).then(res => {
      this.progress = false;
      let retorno:any = res;
      if(retorno.ret){
        this.matsnackbar.open("Relatório enviado ao e-mail cadastrado.", '', {
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
      this.progress = false;
      this.matsnackbar.open("Erro ao gerar relatório.", '', {
        duration: 3000,
        panelClass:["error-snackbar","mat-snack-bar-handset"]
      }); 
    })
  }
}
