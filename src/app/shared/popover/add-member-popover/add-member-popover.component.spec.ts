import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberPopoverComponent } from './add-member-popover.component';

describe('AddMemberPopoverComponent', () => {
  let component: AddMemberPopoverComponent;
  let fixture: ComponentFixture<AddMemberPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMemberPopoverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
