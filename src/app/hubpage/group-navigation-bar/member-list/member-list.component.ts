import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  role = GroupRole;
  owner: User = this.accountService.user;
  showInvitations;
  display;
  popover: PopoverItem;

  constructor(public invitationService: InvitationService, public membershipService: MembershipService,
              public groupService: GroupService, private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.showInvitations = data.showInvitations;
    });
  }

  onClickItem(): void {
    this.display = !this.display;
    if (this.membershipService.checkIfUserIsOwner()){
      this.popover = new PopoverItem(OwnerPopoverComponent);
    } else {
      this.popover = new PopoverItem(AdminPopoverComponent);
    }
  }
}
