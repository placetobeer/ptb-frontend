import {ComponentFixture, TestBed} from '@angular/core/testing';

import { CreateGroupPopupComponent } from './create-group-popup.component';
import {PopupService} from '../../../popups/popup.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {DataService} from '../../../services/data.service';

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
        {provide: DataService,
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

  it('should close popup when cancelButton is clicked', () => {
    const popupservice = fixture.debugElement.injector.get(PopupService);
    component.onButtonClick('cancel');
    expect(popupservice.close).toHaveBeenCalledWith('create-group');
  });

  it('should close popup when createButton is clicked', () => {
    const popupservice = fixture.debugElement.injector.get(PopupService);
    component.onButtonClick('create');
    expect(popupservice.close).toHaveBeenCalledWith('create-group');
  });

  it('should create group when createButton is clicked', () => {
    const dataservice = fixture.debugElement.injector.get(DataService);
    component.onButtonClick('create');
    expect(dataservice.createGroup).toHaveBeenCalledWith(dataservice.userId, '');
  });

  it('should clear input when createButton is clicked', () => {
    component.onButtonClick('create');
    expect(element.querySelector('#groupNameField').innerText).toBe('');
  });

});
