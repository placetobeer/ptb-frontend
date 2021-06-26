import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {InvitationService} from "../../../core/services/invitation.service";
import {MembershipService} from "../../../core/services/membership.service";
import {GroupService} from "../../../core/services/group.service";
import {GroupsMembership} from "../../../core/model/entities/groupsMembership.model";
import {GroupRole} from "../../../core/model/entities/groupRole.enum";
import {PopoverItem} from "../../popover/popover-item";
import {OwnerPopoverComponent} from "../../popover/owner-popover/owner-popover.component";
import {AdminPopoverComponent} from "../../popover/admin-popover/admin-popover.component";
import {InvitationPopoverComponent} from "../../popover/invitation-popover/invitation-popover.component";
import {NgForm} from "@angular/forms";
import {User} from "../../../core/model/entities/user.model";

@Component({
  selector: 'app-group-invitation-list',
  templateUrl: './group-invitation-list.component.html',
  styleUrls: ['./group-invitation-list.component.css']
})
export class GroupInvitationListComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  display;
  popover: PopoverItem;
  invitationId: number;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService) { }

  ngOnInit(): void {
  }

  onClickInv(invitationId: number): void {
    this.invitationId = invitationId;
    this.display = true;
    this.createPopoverItem();
  }

  private checkGroupRole(): GroupRole {
    if (this.membershipService.checkIfUserIsOwner()) {
      return GroupRole.OWNER;
    }
    if (this.membershipService.checkIfUserIsAdmin()) {
      return GroupRole.ADMIN;
    }
  }

  private createPopoverItem(): void {
      switch (this.checkGroupRole()) {
        case GroupRole.OWNER:
        case GroupRole.ADMIN:
        { this.popover = new PopoverItem(InvitationPopoverComponent,
          this.invitationId);
          break;
        }
        default: {
          this.display = false;
          break;
        }
      }
  }
}
