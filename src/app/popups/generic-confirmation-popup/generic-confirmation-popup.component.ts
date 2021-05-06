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

  buttonMap: Map<string, string> = new Map<string, string>([
    ['Ok', 'ok']
  ]);
  confirmationMessage: string;
  constructor(private popupService: PopupService, private popuphelperService: PopupHelperService) {
  }

  ngOnInit(): void {
    this.popuphelperService.confirmationMessageSubject.subscribe({
      next: message => {this.confirmationMessage = message; }
    });
  }

  onButtonClick(buttonName: string): void {
    switch (buttonName){
      case 'ok':
        this.popupService.close(this.id);
        break;
    }
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
