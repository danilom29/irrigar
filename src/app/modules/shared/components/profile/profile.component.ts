import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CrudService } from '../../services/nodejs/crud.service';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';
import { Router } from '@angular/router';
import { DeleteConfirmComponent } from '../delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public paramsToUserRegister: any;

  constructor(
    private crud: CrudService,
    public matsnackbar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('fundo-dash');
  }

  ngOnInit() {
    this.paramsToUserRegister = {
      title: "Invite User",
      type: "invitation"
    }
  }

  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('fundo-dash');
  }

  openDelete(): void {
    let dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px'
      // data: {msg: param['message']}
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.router.navigate(['/login']);
    });
  }



}
