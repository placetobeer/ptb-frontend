import {Injectable, Output} from '@angular/core';
import {PopupService} from './popup.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupHelperService {
  messageSubject = new Subject<string>();
  confirmation = Boolean;
  confirmationSubject = new Subject<boolean>();
  confirmationMessageSubject = new Subject<string>();

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
  openConfirmation(confirmationMessage: string): void{
    if (confirmationMessage !== ''){
      this.confirmationMessageSubject.next(confirmationMessage);
    }else {
      this.confirmationMessageSubject.next('you sure bro?');
    }
    this.popupservice.open('generic-confirmation-popup');
  }
  onConfirm(confirmation: boolean): void{
    this.confirmationSubject.next(confirmation);
  }
}
