import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

/*Services*/
import { CrudService } from './../../services/nodejs/crud.service';

@Component({
  selector: 'bonamondo-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})

export class DeleteConfirmComponent implements OnInit {
  @Output()
  change: EventEmitter<string> = new EventEmitter<string>();

  dataToDelete: any;
  
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmComponent>,
    private crud: CrudService,
    private router: Router,
    private matsnackbar: MatSnackBar,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  ngOnInit() {
  }

  deleteAccount = () => {
    this.crud.deleteAccount(sessionStorage.getItem('access_token'))
    .then(res => {
      this.openDialog(res);
    }, rej => {
      this.openDialog(rej);
    })
  }

  openDialog(param): void {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: {msg: param['message']}
    });

    dialogRef.afterClosed().subscribe(result => {
      sessionStorage.clear();
      this.router.navigate(['/login']);
    });
  }
   
}
