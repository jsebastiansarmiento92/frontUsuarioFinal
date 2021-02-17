import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PopupCarritoComponent } from './popup-carrito.component';

describe('PopupCarritoComponent', () => {
  let component: PopupCarritoComponent;
  let fixture: ComponentFixture<PopupCarritoComponent>;

  beforeEach(waitForAsync(() => {
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
