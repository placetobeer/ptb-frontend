import {Component, Input, OnInit} from '@angular/core';
import {GroupsMembership} from "../../../entities/groupsMembership.model";
import {PopoverInterface} from "../popover.interface";
import {GroupRole} from "../../../entities/groupRole.enum";
import {Group} from "../../../entities/group.model";
import {PopoverComponent} from "../popover.component";

@Component({
  selector: 'app-owner-popover',
  templateUrl: './owner-popover.component.html'
})
export class OwnerPopoverComponent implements OnInit, PopoverInterface {
  @Input() userMembership: any;
  @Input() popoverComponentRef: PopoverComponent;
  adminMessage;

  constructor() {}

  ngOnInit(): void {
    if (this.userMembership.role === GroupRole.ADMIN) {
      this.adminMessage = "Revoke admin role";
    }
    if (this.userMembership.role === GroupRole.MEMBER) {
      this.adminMessage = "Grant admin role";
    }
  }
}
