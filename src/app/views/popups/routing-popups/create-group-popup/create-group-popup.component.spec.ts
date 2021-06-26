import {async, ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { CreateGroupPopupComponent } from './create-group-popup.component';
import {PopupService} from '../../../../core/services/popup.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {By} from '@angular/platform-browser';
import any = jasmine.any;
import {GroupService} from "../../../../core/services/group.service";

describe('CreateGroupPopupComponent', () => {
  let component: CreateGroupPopupComponent;
  let fixture: ComponentFixture<CreateGroupPopupComponent>;
  let element;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateGroupPopupComponent ],
      providers: [
        {provide: HttpClient},
        {provide: HttpHandler},
        {provide: PopupService,
          useClass: class {
            close = jasmine.createSpy('close');
          }
        },
        {provide: GroupService,
          useClass: class  {
            createGroup = jasmine.createSpy('createGroup');
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupPopupComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO Following code will be refactored after finishing frontend architecture


  // it('should close popup when cancelButton is clicked', () => {
  //   const popupService = fixture.debugElement.injector.get(PopupService);
  //   component.onButtonClick('cancel');
  //   expect(popupService.close).toHaveBeenCalledWith('create-group');
  // });
  //
  // it('should close popup when createButton is clicked', () => {
  //   const popupService = fixture.debugElement.injector.get(PopupService);
  //   component.onButtonClick('create');
  //   expect(popupService.close).toHaveBeenCalledWith('create-group');
  // });
  //
  // it('should create group when createButton is clicked', () => {
  //   const dataService = fixture.debugElement.injector.get(DataService);
  //   component.onButtonClick('create');
  //   expect(dataService.createGroup).toHaveBeenCalledWith(dataService.userId, '');
  // });
  //
  // it('should clear input when createButton is clicked', waitForAsync(() => {
  //   element.querySelector('#groupNameField').value = 'Group Name';
  //
  //   fixture.detectChanges();
  //   const buttonCreate = fixture.debugElement.query(By.css('.btn'));
  //
  //   buttonCreate.triggerEventHandler('click', {});
  //   fixture.detectChanges();
  //
  //   fixture.whenStable().then(() => {
  //     expect(element.querySelector('#groupNameField').value).toBe('');
  //   });
  // }));
});
