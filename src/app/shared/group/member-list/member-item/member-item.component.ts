import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {InvitationRequest} from '../../../../core/model/requests/invitation-request.model';
import {InvitationService} from '../../../../core/services/invitation.service';
import {GroupRole} from '../../../../core/model/entities/groupRole.enum';
import {Invitation} from "../../../../core/model/entities/invitation.model";
import {GroupsMembership} from "../../../../core/model/entities/groupsMembership.model";
import {MembershipService} from "../../../../core/services/membership.service";

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
  @Input() invitation: Invitation;
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

  onDeleteInvitation(): void {
    this.invitationService.removeInvitation(this.invitation);
  }
}
