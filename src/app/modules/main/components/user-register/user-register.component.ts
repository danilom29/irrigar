import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  public paramsToUserRegister: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.paramsToUserRegister = {
      title: "Invite User",
      type: "invitation"
    }
  }

  back(){
    this.router.navigate(['/login']);
  }

}
