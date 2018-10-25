import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{ 
  constructor(private router: Router) { }
  ngOnInit() { 
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      //  alert(device.platform);
    } 

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  } 
} 
 
