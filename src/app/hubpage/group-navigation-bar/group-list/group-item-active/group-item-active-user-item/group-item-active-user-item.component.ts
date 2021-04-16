import {Component, Input, OnInit} from '@angular/core';
import {GroupsMembership} from '../../../../../entities/groupsMembership.model';

@Component({
  selector: 'app-group-item-active-user-item',
  templateUrl: './group-item-active-user-item.component.html',
  styleUrls: ['./group-item-active-user-item.component.css']
})
export class GroupItemActiveUserItemComponent implements OnInit {
  @Input() userMembership: GroupsMembership;

  constructor() { }

  ngOnInit(): void {
  }

}
