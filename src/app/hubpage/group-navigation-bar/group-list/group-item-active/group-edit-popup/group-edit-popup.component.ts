import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../../entities/group.model';
import {PopupService} from '../../../../../popups/popup.service';

@Component({
  selector: 'app-group-edit-popup',
  templateUrl: './group-edit-popup.component.html',
  styleUrls: ['./group-edit-popup.component.css']
})
export class GroupEditPopupComponent implements OnInit {
  @Input() group: Group;

  id = 'group-edit';

  buttonMap: Map<string, string> = new Map<string, string>([
    ['Cancel', 'cancel']
  ]);

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
  }

  onButtonClick(buttonName: string): void {
    console.log(buttonName);
    switch (buttonName){
      case 'cancel':
        this.popupService.close(this.id);
    }
  }
}
