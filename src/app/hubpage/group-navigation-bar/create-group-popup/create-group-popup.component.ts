import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {NgForm} from '@angular/forms';
import {InvitationService} from '../../../services/invitation.service';
import {AccountService} from "../../../services/account.service";
import {GroupService} from "../../../services/group.service";
import {HttpGroupService} from "../../../services/httpServices/http-group.service";
import {ErrorService} from "../../../services/error.service";
import {Router} from "@angular/router";

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


  onSubmit(): void {
    this.createGroup(this.ownerId, this.form.value.groupName);
    // TODO send request after successfully saved group
    // TODO subscribe on Promise with promise.then((res) => {})
    this.invitationService.sendInvitationRequest();
    console.log('sendInvitationRequest Methode wurde aufgerufen');
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
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
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
