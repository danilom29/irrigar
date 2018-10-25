import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-area',
  templateUrl: './dialog-area.component.html',
  styleUrls: ['./dialog-area.component.css']
})
export class DialogAreaComponent implements OnInit {
  areaForm: FormGroup;
  eficienciaForm: FormGroup;
  public pi = 3.141592;
  public area;
  public eficiencia = false;
  public dataEficiencia = [{value:"0.9",description:"Eficiência irrigação localizada"}]
  constructor(
    public dialog: MatDialog,
    public matsnackbar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogAreaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data)
    if(this.data)this.eficiencia = true
    this.areaForm = new FormGroup({
      'raio': new FormControl(null, Validators.required)
    });

    this.eficienciaForm = new FormGroup({
      'eficiencia': new FormControl(null, Validators.required)
    });
  }

  onNoClick(): void { 
    this.dialogRef.close({data: this.area});
  } 

  calcularArea = () => {
    let raio = this.areaForm.get('raio').value / 2
    this.area = (this.pi * Math.pow(raio, 2))/10000;
    this.dialogRef.close({data: this.area.toFixed(4)});
  }

  setarEficiencia = () => {
    this.dialogRef.close({data: this.eficienciaForm.get('eficiencia').value});
  }

}
