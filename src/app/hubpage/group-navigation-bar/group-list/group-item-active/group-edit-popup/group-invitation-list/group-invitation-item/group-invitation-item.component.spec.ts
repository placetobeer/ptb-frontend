import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupInvitationItemComponent } from './group-invitation-item.component';

describe('GroupInvitationItemComponent', () => {
  let component: GroupInvitationItemComponent;
  let fixture: ComponentFixture<GroupInvitationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupInvitationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInvitationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
