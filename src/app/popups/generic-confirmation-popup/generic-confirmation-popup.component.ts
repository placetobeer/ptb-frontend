import {Component, NgModule, OnInit} from '@angular/core';
import { PopupService} from '../popup.service';
import {PopupHelperService} from '../popup-helper.service';



@Component({
  selector: 'app-generic-confirmation-popup',
  templateUrl: './generic-confirmation-popup.component.html',
  styleUrls: ['./generic-confirmation-popup.component.css']
})



export class GenericConfirmationPopupComponent implements OnInit {

  id = 'generic-confirmation-popup';
  confirmationMessage: string;
  constructor(private popupService: PopupService, private popuphelperService: PopupHelperService) {
  }

  ngOnInit(): void {
    this.popuphelperService.confirmationMessageSubject.subscribe({
      next: message => {this.confirmationMessage = message; }
    });
  }
  confirm(): void {
    this.popuphelperService.onConfirm(true);
    this.popupService.close(this.id);
  }
  cancel(): void {
    this.popuphelperService.onConfirm(false);
    this.popupService.close(this.id);
  }
}

/* How to implement GenericConfirmationPopup in method
onClick():void {
  method-functionality;}
-->
onClick(): void {
    this.popuphelperService.openConfirmation('your confirmation text');
    this.popuphelperService.confirmationSubject.subscribe({
      next: confirmation => {
        if (confirmation){
          method-functionality;
        }
      }
    });
  }

 */
