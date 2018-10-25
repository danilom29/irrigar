import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  paramsToLogout: any;
  paramsToMenuSidenav: any;

  classToOuterRouterOutlet: string;
  classToInnerRouterOutlet: string;
  classToOuterToolbar: string;
  classToInnerToolbar: string;


  constructor() { }

  ngOnInit() {
    this.checkMenuToggle(false);
    this.paramsToMenuSidenav = {
      menuSettings: [{
        description: "Cálculo",
        route: ['/main/calc'],
        icon: "assignment"
      },{
        description: "Perfil",
        route: ['/main/profile'],
        icon: "person"
      },
      {
        description: "Início",
        route: ['/main/dashboard'],
        icon: "opacity"      
      }], paramsToLogout: {
        routeAfterLogout: ['/login']
      }
    }; 
  }

  checkMenuToggle = (event) => {
    if(event) {
      this.classToOuterRouterOutlet = "outer-router-outlet-opened-menu";
      this.classToInnerRouterOutlet = "inner-router-outlet-opened-menu";

      this.classToOuterToolbar = "outer-toolbar-opened-menu";
      this.classToInnerToolbar = "inner-toolbar-opened-menu";
    } else {
      this.classToOuterRouterOutlet = "outer-router-outlet-closed-menu";
      this.classToInnerRouterOutlet = "inner-router-outlet-closed-menu";

      this.classToOuterToolbar = "outer-toolbar-closed-menu";
      this.classToInnerToolbar = "inner-toolbar-closed-menu";
    }
  }


  

}
