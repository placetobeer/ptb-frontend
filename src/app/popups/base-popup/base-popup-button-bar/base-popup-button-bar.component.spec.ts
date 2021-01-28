import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePopupButtonBarComponent } from './base-popup-button-bar.component';

describe('BasePopupButtonBarComponent', () => {
  let component: BasePopupButtonBarComponent;
  let fixture: ComponentFixture<BasePopupButtonBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasePopupButtonBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePopupButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
