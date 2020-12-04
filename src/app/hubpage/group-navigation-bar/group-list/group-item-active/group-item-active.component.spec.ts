import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupItemActiveComponent } from './group-item-active.component';

describe('GroupItemActiveComponent', () => {
  let component: GroupItemActiveComponent;
  let fixture: ComponentFixture<GroupItemActiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupItemActiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupItemActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
