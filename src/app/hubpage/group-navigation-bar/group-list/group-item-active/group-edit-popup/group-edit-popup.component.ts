import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Group} from '../../../../../entities/group.model';
import {GroupRole} from '../../../../../entities/groupRole.enum';
import {PopupHelperService} from '../../../../../popups/popup-helper.service';
import {GroupService} from "../../../../../services/group.service";
import {HttpGroupService} from "../../../../../services/httpServices/http-group.service";
import {ErrorService} from "../../../../../services/error.service";
import {MembershipService} from "../../../../../services/membership.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-edit-popup',
  templateUrl: './group-edit-popup.component.html',
  styleUrls: ['./group-edit-popup.component.css']
})
export class GroupEditPopupComponent implements OnInit {
  @ViewChild('groupForm') form: NgForm;
  group: Group;

  isUserOwner;
  initialValues;

  constructor(private groupService: GroupService, private membershipService: MembershipService,
              private popuphelperService: PopupHelperService, private httpGroupService: HttpGroupService,
              private errorService: ErrorService, private router: Router) { }

  ngOnInit(): void {
    this.group = this.groupService.currentGroup;
    this.initialValues = {
      groupName : this.groupService.currentGroup.name
    };
    this.isUserOwner = this.membershipService.getUsersMembershipOfSelectedGroup().role === GroupRole.OWNER;
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
    this.httpGroupService.setGroupNameByGroupId(group.id, newGroupName)
      .subscribe({
        next: response => {
          this.groupService.setCurrentGroupName(newGroupName);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }

  private closePopup(): void {
    this.resetValues();
    if (this.groupService.currentGroup != null) {
      this.router.navigate(['/hubpage/' + this.groupService.currentGroup.id]);
    } else {
      this.router.navigate(['/hubpage']);
    }
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

  onDeleteGroup(): void {
    this.popuphelperService.openConfirmation('');
    this.popuphelperService.confirmationSubject.subscribe({
      next: confirmation => {
        if (confirmation){
          this.deleteGroup(this.group);
        }
      }
    });
  }

  deleteGroup(toDeleteGroup: Group): void {
    this.httpGroupService.deleteGroupByGroupId(toDeleteGroup.id)
      .subscribe({
        next: response => {
          this.groupService.removeGroupFromList(toDeleteGroup);
          this.groupService.selectGroup(null);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }
}
