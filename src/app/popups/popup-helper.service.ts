import {Injectable, Output} from '@angular/core';
import {PopupService} from './popup.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupHelperService {
  messageSubject = new Subject<string>();

  constructor(private popupservice: PopupService) {
  }
  openError(errormessage: string): void {
    if (errormessage !== ''){
      this.messageSubject.next('Error: ' + errormessage);
    }else {
      this.messageSubject.next('There is a Problem!');
    }
    this.popupservice.open('generic-error-popup');
    }
}
