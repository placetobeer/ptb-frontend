import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNavigationBarComponent } from './group-navigation-bar.component';

describe('GroupNavigationBarComponent', () => {
  let component: GroupNavigationBarComponent;
  let fixture: ComponentFixture<GroupNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupNavigationBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
