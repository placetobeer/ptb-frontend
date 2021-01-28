import {Component, Input, OnInit} from '@angular/core';
import {Group} from '../../../../entities/group.model';
import {DataService} from '../../../../services/data.service';
import {PopupService} from '../../../../popups/popup.service';

@Component({
  selector: 'app-group-item-active',
  templateUrl: './group-item-active.component.html',
  styleUrls: ['./group-item-active.component.css']
})
export class GroupItemActiveComponent implements OnInit {
  @Input() group: Group;

  constructor(public dataService: DataService, private popupService: PopupService) { }

  ngOnInit(): void {
  }

  onEditGroup(): void {
    this.popupService.open('group-edit');
  }
}
