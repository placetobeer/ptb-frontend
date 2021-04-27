import {Component, Input, OnInit} from '@angular/core';
import {InvitationRequest} from '../../../requests/invitation-request.model';
import {GroupRole} from '../../../entities/groupRole.enum';
import {User} from '../../../entities/user.model';
import {InvitationService} from "../../../services/invitation.service";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  role = GroupRole;
  // TODO: replace Mock
  owner: User = new User(22, 'Hugo Boss');

  constructor(public invitationService: InvitationService) { }

  ngOnInit(): void {
  }

}
