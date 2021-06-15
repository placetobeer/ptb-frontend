import {Component, Input, OnInit} from '@angular/core';
import {Invitation} from "../../../../../../../entities/invitation.model";
import {GroupsMembership} from "../../../../../../../entities/groupsMembership.model";
import {GroupRole} from "../../../../../../../entities/groupRole.enum";
import {InvitationService} from "../../../../../../../services/invitation.service";
import {MembershipService} from "../../../../../../../services/membership.service";
import {Group} from "../../../../../../../entities/group.model";
import {GroupInvitation} from "../../../../../../../entities/groupInvitation.model";

@Component({
  selector: 'app-group-invitation-item',
  templateUrl: './group-invitation-item.component.html',
  styleUrls: ['./group-invitation-item.component.css']
})
export class GroupInvitationItemComponent implements OnInit {

  @Input() groupInvitation: GroupInvitation;
  @Input() membership: GroupsMembership;
  @Input() showInvitations;
  @Input() invitationId: number;
  @Input() pendInv;
  role = GroupRole;
  userNotOwner;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService) { }

  ngOnInit(): void {
    if (!this.membership === null){
      this.userNotOwner = this.membership.role !== GroupRole.OWNER;
    }
  }

}
