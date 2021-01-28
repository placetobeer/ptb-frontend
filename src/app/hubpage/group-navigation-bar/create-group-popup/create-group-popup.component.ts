import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../popups/popup.service';

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit {

  buttonMap: Map<string, string> = new Map<string, string>([
    ['Cancel', 'cancel'],
    ['Ok', 'ok']
  ]);

  id = 'create-group';

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
  }

  onButtonClick(buttonName: string): void {
    switch (buttonName){
      case 'cancel':
        this.popupService.close(this.id);
        break;
      case 'ok':
        console.log('OK!');
    }
  }
}
