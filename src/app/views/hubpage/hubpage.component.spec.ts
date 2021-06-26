import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubpageComponent } from './hubpage.component';

describe('HubpageComponent', () => {
  let component: HubpageComponent;
  let fixture: ComponentFixture<HubpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
