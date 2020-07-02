import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCarritoComponent } from './popup-carrito.component';

describe('PopupCarritoComponent', () => {
  let component: PopupCarritoComponent;
  let fixture: ComponentFixture<PopupCarritoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupCarritoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
