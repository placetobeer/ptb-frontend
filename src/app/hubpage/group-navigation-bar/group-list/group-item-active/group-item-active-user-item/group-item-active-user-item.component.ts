import {Component, Input, OnInit} from '@angular/core';
import {UserMembership} from '../../../../../entities/userMembership.model';

@Component({
  selector: 'app-group-item-active-user-item',
  templateUrl: './group-item-active-user-item.component.html',
  styleUrls: ['./group-item-active-user-item.component.css']
})
export class GroupItemActiveUserItemComponent implements OnInit {
  @Input() userMembership: UserMembership;

  constructor() { }

  ngOnInit(): void {
  }

}
