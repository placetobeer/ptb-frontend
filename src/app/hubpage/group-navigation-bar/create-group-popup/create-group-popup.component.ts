import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {NgForm} from '@angular/forms';
import {InvitationService} from '../../../services/invitation.service';
import {HttpGroupService} from "../../../services/httpServices/http-group.service";
import {Router} from "@angular/router";
import {GroupService} from '../../../services/group.service';
import {AccountService} from '../../../services/account.service';
import {ErrorService} from '../../../services/error.service';

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  id = 'create-group';
  ownerId = this.accountService.user.id;

  constructor(private popupService: PopupService, private groupService: GroupService, public invitationService: InvitationService,
              private accountService: AccountService, private httpGroupService: HttpGroupService, private errorService: ErrorService,
              private router: Router) { }

  ngOnInit(): void {}

  onSubmit(): void {
    this.createGroup(this.ownerId, this.form.value.groupName);
    this.form.reset();
    this.popupService.close(this.id);
  }

  createGroup(currentUserId: number, groupName: string): void {
    this.httpGroupService.createGroupByUserIdAndGroupName(currentUserId, groupName)
      .subscribe({
        next: group => {
          this.groupService.addGroup(group);
          this.groupService.selectGroup(group);
          this.router.navigate(['/hubpage/' + group.id]);
          this.sendInvitationList(group.id);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }

  sendInvitationList(groupId: number): void {
    this.invitationService.sendInvitationRequest(groupId);
  }

  onCancel(): void {
    this.form.reset();
    this.popupService.close(this.id);
    if (this.groupService.currentGroup != null) {
      this.router.navigate(['/hubpage/' + this.groupService.currentGroup.id]);
    } else {
      this.router.navigate(['/hubpage']);
    }
  }
}
