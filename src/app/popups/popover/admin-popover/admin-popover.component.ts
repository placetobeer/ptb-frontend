import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {PopoverInterface} from "../popover.interface";
import {HttpMembershipService} from "../../../services/httpServices/http-membership.service";
import {PopupHelperService} from "../../popup-helper.service";
import {MembershipService} from "../../../services/membership.service";
import {ErrorService} from "../../../services/error.service";
import {PopoverComponent} from "../popover.component";
import {GroupsMembership} from "../../../entities/groupsMembership.model";

@Component({
  selector: 'app-admin-popover',
  templateUrl: './admin-popover.component.html'
})
export class AdminPopoverComponent implements OnInit, PopoverInterface {
  @Input() userMembership: GroupsMembership;
  @Input() popoverComponentRef: PopoverComponent;

  constructor(private httpMembershipService: HttpMembershipService, private popuphelperService: PopupHelperService,
              private membershipService: MembershipService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  onKickMember(): void {
    this.popoverComponentRef.kickMember(this.userMembership);
  }
}
