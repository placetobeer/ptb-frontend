import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
import {NgForm} from "@angular/forms";
import {InvitationPopoverComponent} from "../../../popups/popover/invitation-popover/invitation-popover.component";
import {Group} from "../../../entities/group.model";

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  owner: User = this.accountService.user;
  @Input() showInvitations;
  @Input() newGroup;
  @Input() pendInv;
  display;
  popover: PopoverItem;
  userMembership: GroupsMembership;
  invitationId: number;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService,
              public groupService: GroupService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickItem(userMembership: GroupsMembership): void {
    this.userMembership = userMembership;
    if (!this.checkIfListItemShowsOwner() && !this.checkIfListItemShowsLoggedInUser()){
      this.display = true;
      this.createPopoverItem();
    }
  }

  onClickInv(invitationId: number): void {
    this.invitationId = invitationId;
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

  checkIfListItemShowsOwner(): boolean {
    return this.userMembership.role === GroupRole.OWNER;
  }

  checkIfListItemShowsLoggedInUser(): boolean {
    return JSON.stringify(this.userMembership) === JSON.stringify(this.membershipService.userMembership);
  }

  private createPopoverItem(): void {
    if (!this.pendInv){
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
          this.display = false;
          break;
        }
      }
    }
    else {
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
}
