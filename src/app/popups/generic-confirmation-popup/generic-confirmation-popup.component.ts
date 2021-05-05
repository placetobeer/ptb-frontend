import {Component, NgModule, OnInit} from '@angular/core';
import {PopupService} from '../popup.service';



@Component({
  selector: 'app-generic-confirmation-popup',
  templateUrl: './generic-confirmation-popup.component.html',
  styleUrls: ['./generic-confirmation-popup.component.css']
})



export class GenericConfirmationPopupComponent implements OnInit {

  buttonMap: Map<string, string> = new Map<string, string>([
    ['Ok', 'ok']
  ]);

  id = 'generic-confirmation-popup';
  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
  }

  onButtonClick(buttonName: string): void {
    switch (buttonName){
      case 'ok':
        this.popupService.close(this.id);
        break;
    }
  }
}
