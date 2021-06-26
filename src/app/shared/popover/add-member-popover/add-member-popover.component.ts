import {Component, Input, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PopoverComponent} from "../popover.component";
import {Subscription} from "rxjs";
import {MembershipService} from "../../../core/services/membership.service";
import {InvitationService} from "../../../core/services/invitation.service";
import {Invitation} from "../../../core/model/entities/invitation.model";
import {GroupService} from "../../../core/services/group.service";
import {ErrorService} from "../../../core/services/error.service";
import {PopupHelperService} from "../../../core/services/popup-helper.service";

@Component({
  selector: 'app-add-member-popover',
  templateUrl: './add-member-popover.component.html',
  styleUrls: ['./add-member-popover.component.css']
})
export class AddMemberPopoverComponent implements OnInit, OnDestroy {
  @ViewChild('subForm', {static: false}) subForm: NgForm;
  @Input() data: any;
  @Input() popoverComponentRef: PopoverComponent;
  private subscriptions: Subscription[] = [];
  public isOwner = false;

  constructor(private membershipService: MembershipService,
              private invitationService: InvitationService,
              private groupService: GroupService,
              private errorService: ErrorService,
              private popupHelperService: PopupHelperService) { }

  ngOnInit(): void {
    this.isOwner = this.membershipService.checkIfUserIsOwner();
    this.invitationService.removeAllInvitations();
  }

  onSubmit(): void {
    const groupId = this.data;
    const newInvitation = new Invitation(this.subForm.value.email, this.subForm.value.grantAdminRole);
    const invitationDuplicate = this.invitationService.groupInvitations.find(
      groupInvitation => this.subForm.value.email === groupInvitation.mail);
    const membershipDuplicate = this.membershipService.groupMemberships.find(
      groupMembership => this.subForm.value.email === groupMembership.user.email);
    if (!invitationDuplicate){
      if (!membershipDuplicate){
        this.invitationService.addInvitation(newInvitation);
        this.invitationService.sendInvitationRequest(groupId);
        this.subForm.reset();
        this.popoverComponentRef.removeComponent();
      }
      else {
        this.subForm.reset();
        this.popupHelperService.openError("User with this email is already in Group");
      }
    } else {
      this.subForm.reset();
      this.popupHelperService.openError("This email was already added");
    }
  }

  onCancel(): void {
    this.subForm.reset();
    this.popoverComponentRef.removeComponent();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
