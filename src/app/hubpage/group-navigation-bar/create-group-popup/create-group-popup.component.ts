import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {DataService} from '../../../services/data.service';

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit {
  buttonMap: Map<string, string> = new Map<string, string>([
    ['Create', 'create'],
    ['Cancel', 'cancel']
  ]);

  id = 'create-group';
  groupName = '';
  private currentUserId = this.dataService.userId;

  constructor(private popupService: PopupService, private dataService: DataService) { }

  ngOnInit(): void {}

  onButtonClick(buttonName: string): void {
    switch (buttonName){
      case 'cancel':
        this.popupService.close(this.id);
        break;
      case 'create':
        this.dataService.createGroup(this.currentUserId, this.groupName);
        this.popupService.close(this.id);
        break;
    }
  }

  onInputGroupName(groupName: string): void {
    this.groupName = groupName;
  }
}
