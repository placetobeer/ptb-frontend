import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {User} from "../../../entities/user.model";
import {DataService} from "../../../services/data.service";

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
  private groupName = ' ';
  private currentUser;

  constructor(private popupService: PopupService, private dataService: DataService) { }

  ngOnInit(): void {
    // todo: remove mock
    this.currentUser = new User(7, 'Christopholus');
  }

  onButtonClick(buttonName: string): void {
    switch (buttonName){
      case 'cancel':
        this.popupService.close(this.id);
        break;
      case 'create':
        this.dataService.createGroup(this.currentUser, this.groupName);
        this.popupService.close(this.id);
        break;
    }
  }

  // tslint:disable-next-line:typedef
  onInputGroupName(groupName: string) {
    this.groupName = groupName;
  }
}
