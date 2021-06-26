import {Component, Input, OnInit} from '@angular/core';
import {Invitation} from "../../../../core/model/entities/invitation.model";
import {GroupsMembership} from "../../../../core/model/entities/groupsMembership.model";
import {GroupRole} from "../../../../core/model/entities/groupRole.enum";
import {InvitationService} from "../../../../core/services/invitation.service";
import {MembershipService} from "../../../../core/services/membership.service";
import {Group} from "../../../../core/model/entities/group.model";
import {GroupInvitation} from "../../../../core/model/entities/groupInvitation.model";

@Component({
  selector: 'app-group-invitation-item',
  templateUrl: './group-invitation-item.component.html',
  styleUrls: ['./group-invitation-item.component.css']
})
export class GroupInvitationItemComponent implements OnInit {

  @Input() groupInvitation: GroupInvitation;
  @Input() invitationId: number;
  role: GroupRole;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService) { }

  ngOnInit(): void {
    this.role = this.groupInvitation.role;
  }

}
