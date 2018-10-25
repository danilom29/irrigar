import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAreaComponent } from './dialog-area.component';

describe('DialogAreaComponent', () => {
  let component: DialogAreaComponent;
  let fixture: ComponentFixture<DialogAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
