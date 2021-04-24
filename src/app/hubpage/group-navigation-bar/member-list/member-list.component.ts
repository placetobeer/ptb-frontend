import {Component, Input, OnInit} from '@angular/core';
import {Invitation} from '../../../requests/invitation-request.model';
import {GroupRole} from "../../../entities/groupRole.enum";
import {User} from "../../../entities/user.model";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @Input() invitations: Invitation[];
  role = GroupRole;
  // TODO: replace Mock
  owner: User = new User(22, 'Hugo Boss');

  constructor() { }

  ngOnInit(): void {
  }

}
