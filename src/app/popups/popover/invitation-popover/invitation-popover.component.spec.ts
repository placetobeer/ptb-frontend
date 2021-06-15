import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitationPopoverComponent } from './invitation-popover.component';

describe('InvitationPopoverComponent', () => {
  let component: InvitationPopoverComponent;
  let fixture: ComponentFixture<InvitationPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitationPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitationPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
