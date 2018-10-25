import { CrudService } from './../../services/nodejs/crud.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'bonamondo-menu-sidenav',
  animations: [
    trigger(
      'firstAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('200ms', style({transform: 'translateX(-100%)', 'opacity': 0}),
          )]
      )]
    ),
    trigger(
      'myAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('200ms', style({transform: 'translateX(-100%)', 'opacity': 0}),
          )]
      )]
    ),
    trigger(
      'buttonAnimation',
      [
        transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('200ms', style({transform: 'translateX(-100%)', 'opacity': 0}),
          )]
      )]
    )
  ],
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.css']
})
export class MenuSidenavComponent implements OnInit {
  @Input() params;
  public titulo;
  constructor(
    private crud: CrudService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onMenuRoute = (route) => {
    this.titulo = "alfjaiokl"
    this.router.navigate(route);
  }

  logout = () => {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
