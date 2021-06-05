import {Component, Input, OnInit} from '@angular/core';
import {GroupRole} from '../../../entities/groupRole.enum';
import {User} from '../../../entities/user.model';
import {InvitationService} from "../../../services/invitation.service";
import {AccountService} from "../../../services/account.service";
import {MembershipService} from "../../../services/membership.service";
import {GroupService} from "../../../services/group.service";
import {ActivatedRoute} from "@angular/router";
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

  constructor(public invitationService: InvitationService, public membershipService: MembershipService,
              public groupService: GroupService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onClickItem(userMembership: GroupsMembership): void {
    const isMemberOwner = userMembership.role === GroupRole.OWNER;
    if (!isMemberOwner) {
      this.display = !this.display;
    }
    if (this.membershipService.checkIfUserIsOwner() && !isMemberOwner){
      this.popover = new PopoverItem(OwnerPopoverComponent, userMembership);
    }
    if (this.membershipService.checkIfUserIsAdmin() && !isMemberOwner) {
      this.popover = new PopoverItem(AdminPopoverComponent, userMembership);
    }
  }
}
