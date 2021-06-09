import {Component, Input, OnInit} from '@angular/core';
import {GroupRole} from '../../../entities/groupRole.enum';
import {User} from '../../../entities/user.model';
import {InvitationService} from "../../../services/invitation.service";
import {AccountService} from "../../../services/account.service";
import {MembershipService} from "../../../services/membership.service";
import {GroupService} from "../../../services/group.service";
import {PopoverItem} from "../../../popups/popover/popover-item";
import {OwnerPopoverComponent} from "../../../popups/popover/owner-popover/owner-popover.component";
import {AdminPopoverComponent} from "../../../popups/popover/admin-popover/admin-popover.component";
import {GroupsMembership} from "../../../entities/groupsMembership.model";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  owner: User = this.accountService.user;
  @Input() showInvitations;
  display;
  popover: PopoverItem;
  userMembership;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService,
              public groupService: GroupService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickItem(userMembership: GroupsMembership): void {
    this.userMembership = userMembership;
    if (!this.checkIfListItemShowsOwner()){
      this.togglePopoverItem();
      this.createPopoverItem();
    }
  }

  private togglePopoverItem(): void {
      this.display = !this.display;
  }

  private checkGroupRole(): GroupRole {
    if (this.membershipService.checkIfUserIsOwner()) {
      return GroupRole.OWNER;
    }
    if (this.membershipService.checkIfUserIsAdmin()) {
      return GroupRole.ADMIN;
    }
  }

  private checkIfListItemShowsOwner(): boolean {
    return this.userMembership.role === GroupRole.OWNER;
  }

  private createPopoverItem(): void {
    switch (this.checkGroupRole()) {
      case GroupRole.OWNER: {
        this.popover = new PopoverItem(OwnerPopoverComponent, this.userMembership);
        break;
      }
      case GroupRole.ADMIN: {
        this.popover = new PopoverItem(AdminPopoverComponent, this.userMembership);
        break;
      }
      default: {
        break;
      }
    }
  }
}
