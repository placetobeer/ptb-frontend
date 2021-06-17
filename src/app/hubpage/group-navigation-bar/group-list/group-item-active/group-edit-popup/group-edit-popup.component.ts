import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Group} from '../../../../../entities/group.model';
import {PopupHelperService} from '../../../../../popups/popup-helper.service';
import {GroupService} from "../../../../../services/group.service";
import {HttpGroupService} from "../../../../../services/httpServices/http-group.service";
import {ErrorService} from "../../../../../services/error.service";
import {MembershipService} from "../../../../../services/membership.service";
import {Router} from "@angular/router";
import {RoutingService} from "../../../../../services/routing.service";
import {Subscription} from "rxjs";
import {InvitationService} from "../../../../../services/invitation.service";
import {PopoverItem} from "../../../../../popups/popover/popover-item";
import {InvitationPopoverComponent} from "../../../../../popups/popover/invitation-popover/invitation-popover.component";
import {AddMemberPopoverComponent} from "../../../../../popups/popover/add-member-popover/add-member-popover.component";

@Component({
  selector: 'app-group-edit-popup',
  templateUrl: './group-edit-popup.component.html',
  styleUrls: ['./group-edit-popup.component.css']
})
export class GroupEditPopupComponent implements OnInit, OnDestroy {
  @ViewChild('groupForm') form: NgForm;
  group: Group;
  private subscriptions: Subscription[] = [];
  initialValues;
  showInvitations;
  displayInvitation;
  popover: PopoverItem;

  constructor(private groupService: GroupService, public membershipService: MembershipService,
              private popupHelperService: PopupHelperService, private httpGroupService: HttpGroupService,
              private errorService: ErrorService, private routingService: RoutingService,
              private invitationService: InvitationService) { }

  ngOnInit(): void {
    this.group = this.groupService.currentGroup;
    this.initialValues = {
      groupName : this.groupService.currentGroup.name
    };
    this.showInvitations = false;
    this.invitationService.clearGroupInvitations();
    this.invitationService.loadGroupInvitations(this.group.id);
  }

  private applyGroupChanges(): void {
    if (this.form.untouched || !this.form.valid){
      return;
    }
    this.changeGroupName();
  }

  private changeGroupName(): void {
    const groupNameInput = this.form.controls.groupName;
    if (groupNameInput.untouched || !groupNameInput.valid){
      return;
    }
    this.setActiveGroupName(this.group, groupNameInput.value);
  }

  setActiveGroupName(group: Group, newGroupName: string): void {
    const subscription = this.httpGroupService.setGroupNameByGroupId(group.id, newGroupName)
      .subscribe({
        next: response => {
          this.groupService.setCurrentGroupName(newGroupName);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  private closePopup(): void {
    this.resetValues();
    this.routingService.navigateToHubpage();
  }

  private resetValues(): void {
    this.form.reset();
    this.form.controls.groupName.setValue( this.initialValues.groupName);
  }

  onSubmit(): void {
    this.applyGroupChanges();
    this.closePopup();
  }

  onCancel(): void {
    this.closePopup();
  }

  onAddSingleMember(): void{
    this.displayInvitation = true;
    this.popover = new PopoverItem(AddMemberPopoverComponent,
      this.groupService.currentGroup.id);
  }

  onDeleteGroup(): void {
    this.popupHelperService.openConfirmation('Do you really want to delete the group?');
    const subscription = this.popupHelperService.confirmationSubject.subscribe({
      next: confirmation => {
        if (confirmation){
          this.deleteGroup(this.group);
        }
      }
    });
    this.subscriptions.push(subscription);
  }

  deleteGroup(toDeleteGroup: Group): void {
    const subscription = this.httpGroupService.deleteGroupByGroupId(toDeleteGroup.id)
      .subscribe({
        next: response => {
          this.groupService.removeGroupFromList(toDeleteGroup);
          this.groupService.selectGroup(null);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
