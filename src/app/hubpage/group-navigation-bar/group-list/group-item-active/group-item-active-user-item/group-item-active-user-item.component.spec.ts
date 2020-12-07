import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemActiveUserItemComponent } from './group-item-active-user-item.component';

describe('GroupItemActiveUserTimeComponent', () => {
  let component: GroupItemActiveUserItemComponent;
  let fixture: ComponentFixture<GroupItemActiveUserItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemActiveUserItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemActiveUserItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
