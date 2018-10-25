import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { CrudService } from '../../services/nodejs/crud.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
// import {map} from 'rxjs/operators/map';
import { pipe } from 'rxjs';
// import { start } from 'repl';

export class Cultura {
  constructor(public id: number,public descricao: string) { }
}

@Component({
  selector: 'app-dialog-overview',
  templateUrl: './dialog-overview.component.html',
  styleUrls: ['./dialog-overview.component.css']
})
export class DialogOverviewComponent implements OnInit {
  public menssagem: string;
  public te: any;
  public kc;
  public flag;
  public culturas: Cultura [];
  optionsCtrl: FormControl;
  filteredOptions: any;
  public estagios: any;
  kcForm: FormGroup;
  constructor( 
    private crud: CrudService,
    public dialog: MatDialog,
    public matsnackbar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
      this.menssagem = data.msg;
      this.culturas = data.culturas;
      this.estagios = data.estagios;
      this.optionsCtrl = new FormControl();
      this.filteredOptions = this.optionsCtrl.valueChanges
      .pipe(
        startWith(null)
        ,map(value => value && typeof value === 'object' ? value.descricao : value)
        ,map(name => this.filter(name))
      )

    }

    filterStates(descricao: any) {
      return this.culturas.filter(state =>
        state.descricao.toLowerCase().indexOf(descricao.toLowerCase()) === 0);
    }

  onNoClick(): void { 
    let data =  {
      data: this.kc,
      cultura: null
    }
    this.dialogRef.close(data);
  } 

  ngOnInit() {
    this.kcForm = new FormGroup({
      'culture_id': new FormControl(null, Validators.required),
      'stage_id': new FormControl(null, Validators.required),
      'hideKc': new FormControl(),
      'umidade_maior_setenta': new FormControl(null, Validators.required),
      'kc': new FormControl(null, null),
      'kc_value': new FormControl(null, null)
    });

  }

  filter(name) {
    return name ? this.culturas.filter(s => s.descricao.toLowerCase().indexOf(name.toLowerCase()) === 0)
      : this.culturas;
  }

  displayFn (cultura: any){
    cultura = cultura && typeof cultura === 'object' ? cultura.descricao : cultura;
    return cultura;
  } 

  returnFn(cultura: any): number | undefined {
    return cultura ? cultura.id : undefined;
  }

  hideKc () {
    console.log(this.dataKc)
    this.kcForm.value.hideKc = !this.kcForm.value.hideKc; 
    if(this.kcForm.value.hideKc){
      this.kcForm.controls['kc'].setValidators([Validators.required]);
      this.kcForm.controls['kc'].updateValueAndValidity();
      // this.kcForm.controls['kc_value'].setValidators([]);
      // this.kcForm.controls['kc_value'].updateValueAndValidity();
    }else{ 
      this.kcForm.controls['kc'].setValidators([]);
      this.kcForm.controls['kc'].updateValueAndValidity();
      // this.kcForm.controls['kc_value'].setValidators([Validators.required]);
      // this.kcForm.controls['kc_value'].updateValueAndValidity();
    }

  }

  dataKc: any;
  readDataValueKc = () => { 
    if(typeof this.kcForm.value.culture_id === "object"){
      this.crud.readValueKc(this.kcForm).then(res => {
        this.dataKc = res['response'];
        if(this.dataKc.length > 0){
          this.matsnackbar.open(res['message'], '', {
            duration: 3000
          });
        }else{
          this.matsnackbar.open('Nenhum resultado encontrado', '', {
            duration: 3000
          });
        }
      })
    }else{
      let dialogRef = this.dialog.open(DialogMessageComponent, {
        width: '250px',
        data: {msg: "Cultura não existente, \n marque 'Inserir nova cultura' e preencha o valor do Kc."}
      });
    }
  }

  selecionaKc = () => {
    let data =  {
      data: this.kcForm.value.kc_value,
      cultura: this.kcForm.value.culture_id.id
    }
    this.dialogRef.close(data);
  }

  createDataValueKc = () => {console.log(this.kcForm,this.kcForm.value)
    this.crud.createValueKc(this.kcForm.value).then(res => {
      // this.dataKc = res['response'];
      console.log(res['response'].kc)
      if(res['response'].kc){
        this.matsnackbar.open(res['message'], '', {
          duration: 3000
        });
        let data =  {
          data: res['response'].kc,
          cultura: res['response'].id
        }
        this.dialogRef.close(data);
      }
    }, rej => {
      this.matsnackbar.open(rej['message'], '', {
        duration: 3000
      })
    }); 
  }

}
