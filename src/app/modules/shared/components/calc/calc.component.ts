import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgModel } from '@angular/forms';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
declare var cordova;

/**
 * Services
 */
import { CrudService } from './../../../shared/services/nodejs/crud.service';
import { forEach } from '@angular/router/src/utils/collection';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { DialogOverviewComponent } from '../dialog-overview/dialog-overview.component';
import { DialogAreaComponent } from '../dialog-area/dialog-area.component';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent implements OnInit {

  hideForm: boolean;
  dashboardForm: FormGroup;
  paramsToTableData: any;
  statusSelect: any;
  title: string;
  showKc: boolean = false;
  public pi = 3.14159265358979;
  public dados = [];
  public diaria = 0;
  public ra = 0;
  public et0 = 0;
  public etc = 0;
  public litro_vaso = 0;
  private latitude: number;
  public dividendo = 0;
  public aplicacao = 0;
  private kc;

  /*update properties on change start*/
  paramToSearch: any;
  submitToCreate: boolean;
  submitToUpdate: boolean;
  submitButton: string;
  /*update properties on change end*/

  constructor(
    private crud: CrudService,
    public matsnackbar: MatSnackBar,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router
  ) { 
    navigator.geolocation.getCurrentPosition(res => {  
      // console.log(res.coords.latitude);
    });
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('fundo-dash');
  }

  /**
   * Cycle hook actions start
   */
  ngOnInit() {
    this.hideForm = false;
    this.statusSelect = ["To-Do", "Problems", "Done"]; 

    navigator.geolocation.getCurrentPosition(res => { console.log(res)
      alert("Latitude: "+res.coords.latitude);
      this.dashboardForm.get('latitude').setValue(res.coords.latitude);
      this.radiacaoPorDia();
    });

    this.dashboardForm = new FormGroup({
      'tmax': new FormControl(null, Validators.required),
      'tmin': new FormControl(null, Validators.required),
      'tmed': new FormControl(null, Validators.required),
      'latitude': new FormControl(null, Validators.required),
      'ra': new FormControl(null, null),
      'culture_id': new FormControl(null, Validators.required),
      'kc': new FormControl(null, Validators.required),
      'area': new FormControl(null, Validators.required),
      'eficiencia': new FormControl(null, Validators.required)
    });

    this.readDataCultura();
    this.readDataEstagio();
    
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('fundo-dash');
  }
  /**
   * Cycle hook actions end
   */

  public culturas: any;
  public estagios: any;
  
  openDialogKc = () => {
    let dialogRef;
    dialogRef = this.dialog.open(DialogOverviewComponent, {
      width: '290px',
      height: '405px',
      data: {
        culturas: this.culturas,
        estagios: this.estagios 
      }
    });

    dialogRef.afterClosed().subscribe(result => { 
      if(typeof result != "undefined"){
        this.dashboardForm.get('kc').setValue(result.data);
        this.dashboardForm.get('culture_id').setValue(result.cultura);
        this.showKc = true;
        this.kc = result.data;
      }
    });

  }

  openDialogArea = () => { 
    let dialogRef;
    dialogRef = this.dialog.open(DialogAreaComponent, {
      width: '290px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(result => { 
      if(typeof result != "undefined"){
        this.dashboardForm.get('area').setValue(result.data);
      }
    });

  }

  openDialogEficiencia = () => { 
    let dialogRef;
    dialogRef = this.dialog.open(DialogAreaComponent, {
      width: '290px',
      height: '175px',
      data: {flag: 1}
    });

    dialogRef.afterClosed().subscribe(result => { 
      if(typeof result != "undefined"){
        this.dashboardForm.get('eficiencia').setValue(result.data);
      }
    });

  }

  readDataCultura = () => {
    this.crud.readCulturas().then(res => {     
      this.culturas = res;
    })
  }

  readDataEstagio = () => {
    this.crud.readEstagios().then(res => {   
      this.estagios = res;
    })
  }

  onCalcSave = () => {
    this.hideForm = false;
    let params = {
      radiacao: this.ra,
      tmax: this.dashboardForm.controls.tmax.value,
      tmed: this.dashboardForm.controls.tmed.value,
      tmin: this.dashboardForm.controls.tmin.value,
      kc: this.dashboardForm.controls.kc.value,
      area: this.dashboardForm.controls.area.value,
      eficiencia: this.dashboardForm.controls.eficiencia.value,
      etc: this.etc,
      eto: this.et0,
      litro_vaso: this.litro_vaso,
      culture_id: this.dashboardForm.get('culture_id').value,
      data_inclusao: this.dataAtualFormatada()
    }

    this.crud.create(params)
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
    });    
  }

  closeResult = () => {
    this.hideForm = false;
  }
  
  onDashboardFormSubmit = () => {
    this.hideForm = true;     
    this.ra = this.dashboardForm.controls['ra'].value;
    let tmedia = this.dashboardForm.controls['tmed'].value;
    let tmaxima = this.dashboardForm.controls['tmax'].value;
    let tminima = this.dashboardForm.controls['tmin'].value;
    let base = Math.round(tmaxima-tminima); 
    this.et0 = (0.0023*this.ra)*(Math.pow(base, 0.5))*(tmedia+17.8);
    this.et0 = parseFloat(this.et0.toFixed(2));
    this.etc = this.dashboardForm.controls['kc'].value*this.et0;
    this.etc = parseFloat(this.etc.toFixed(2));
    this.litro_vaso = this.etc*(this.dashboardForm.controls['area'].value/this.dashboardForm.controls['eficiencia'].value);
    this.litro_vaso = parseFloat(this.litro_vaso.toFixed(2));
    this.dividendo = this.litro_vaso * 1000 >= 1000 ? 3 : 2;
    this.aplicacao = (this.litro_vaso * 1000) / this.dividendo;
    this.aplicacao = parseFloat(this.aplicacao.toFixed(2));
  }

  anguloHorario() { 
    let lat = this.dashboardForm.controls['latitude'].value;
    let tan = (Math.acos(((((-Math.tan((lat)*this.pi/180))*(Math.tan((-23.01163673)*this.pi/180))))+(-0.015707317/((0.985800348)*(Math.cos((-23.01163673)*this.pi/180))))))*180/this.pi);
    return tan;
  };
  
  meioDiaSolar(argument){ 
    let sol = (12+(0.12357*(Math.sin(argument))-(0.004289*(Math.cos(argument)))+(0.153809*(Math.sin(2*argument)))+(0.060783*(Math.cos(argument)))));
    return sol;
  }
  
  nascerSol() {
    let dia = this.dateDiferencaEmDias();
    let param = dia;
    if(dia == 1){
      param = this.d();
    }
    let I3 = this.anguloHorario(), I2 = this.meioDiaSolar(param);
    let nascer = (I2-(I3/15));
  }
  
  porSol() {
    let dia = this.dateDiferencaEmDias();
    let param = dia;
    if(dia == 1){
      param = this.d();
    }
    let I3 = this.anguloHorario(), I2 = this.meioDiaSolar(param);
    let por = (I2+(I3/15));
  }
  
  declinacaoSolar(){    
    let dia = this.dateDiferencaEmDias();
    let declinacao = (23.45*(Math.sin(((360*(dia+284))/365)*this.pi/180)));
    return declinacao;
  }
  
  d(){
    let dia = this.dateDiferencaEmDias();    
    let indefinido = (dia-1)*(360/365.242);
    return indefinido;
  }
  
  distanciaTerraSol(){
    
    let dia = this.dateDiferencaEmDias(); 
    let distancia = 1+0.033*Math.cos(2*this.pi/365*dia);
    return distancia;
  }
  
  hora_cv(argument) {
    let hora = ((argument-this.direita(argument))/100)+this.direita(argument)/60;
    return hora;
  }
  
  direita(argument) {
    argument = argument.toString();
    let res = argument.substring(argument.length - 2, argument.length);
    return res;
  }
  
  h(argument) { 
    let dia = this.dateDiferencaEmDias();
    let param = dia;
    if(dia == 1){
      param = this.d();
    }
    let angulo = 15*(argument-this.meioDiaSolar(param));
    return angulo;
  }
  
  cos(argument){ 
    let lat = this.dashboardForm.controls['latitude'].value;
    
    let cosseno = Math.sin(lat*this.pi/180)*Math.sin(this.declinacaoSolar()*this.pi/180)+Math.cos(lat*this.pi/180)*Math.cos(this.declinacaoSolar()*this.pi/180)*Math.cos(argument*this.pi/180);
    return cosseno;
  }
  
  ro(argument){ 
    let r = 1367*argument*this.distanciaTerraSol(); 
    return r;
  }  

  dateDiferencaEmDias() {
    let first_day = new Date("01/01/2018");
    let now = new Date();
    // Descartando timezone e horário de verão
    var utc1 = Date.UTC(now.getFullYear(), first_day.getMonth(), first_day.getDate());
    var utc2 = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1);
 
    return Math.floor((utc2 - utc1) / ( 1000 * 60 * 60 * 24) );
  }

  radiacaoPorDia(){
    if(this.dashboardForm.controls['latitude'].value){
      this.dados =[];
      this.diaria = 0;
      let final = 1900, inicial = 500;
      let anterior = inicial; 
      while(anterior<=final){
        let hora = this.hora_cv(anterior);
        let angulo = this.h(hora);
        let cosseno = this.cos(angulo);
        let r = this.ro(cosseno);
        let integral;
        if(r<0){
          integral = 0
        }else{
          integral = r;
        }
        this.dados.push({"integral":integral,"hora":anterior});
        anterior = anterior+5; 
      }
      let soma = 0;
      let soma1 = 0; 
      
      for(let i = 0; i < this.dados.length; i++) {
        let element = this.dados[i];
        if(element.hora == inicial || element.hora == inicial + 100){
          soma+=element.integral;
          if(element.hora == inicial + 100)i--;        
        }
        if(element.hora == inicial + 100){
          inicial += 100;
          let horaria = (5/60)*((soma/2)+soma1);
          soma = 0;
          soma1 = 0; 
          this.diaria+=horaria;
        }
        if(element.hora >= inicial + 5 && element.hora <= inicial + 55){ 
          soma1+=element.integral;
        }
      }; 
      let valorFinal = (this.diaria*0.0036)/2.45;      
      this.dashboardForm.controls['ra'].setValue(parseFloat(valorFinal.toFixed(2)));

    }else{
      this.openDialog();
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogMessageComponent, {
      width: '250px',
      data: {msg: "Informe a LATITUDE, para continuar operação."}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  dataAtualFormatada(){
    let day;
    let month;
		let data = new Date();
		let dia = data.getDate();
		if (dia.toString().length == 1){
      day = "0"+dia;
    }else{
      day = data.getDate();
    }
		  
		var mes = data.getMonth()+1;
		if (mes.toString().length == 1){
      month = "0"+mes;
    }else{
      month = data.getMonth()+1;
    }
      
		var ano = data.getFullYear();  
		return ano+"-"+month+"-"+day;
	}

}
