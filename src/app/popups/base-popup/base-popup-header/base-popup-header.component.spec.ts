import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePopupHeaderComponent } from './base-popup-header.component';

describe('BasePopupHeaderComponent', () => {
  let component: BasePopupHeaderComponent;
  let fixture: ComponentFixture<BasePopupHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasePopupHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePopupHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
