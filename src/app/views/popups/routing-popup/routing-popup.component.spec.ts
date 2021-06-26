import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingPopupComponent } from './routing-popup.component';

describe('RoutingPopupComponent', () => {
  let component: RoutingPopupComponent;
  let fixture: ComponentFixture<RoutingPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutingPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutingPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
