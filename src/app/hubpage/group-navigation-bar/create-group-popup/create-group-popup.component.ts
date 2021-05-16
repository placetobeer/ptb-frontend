import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {NgForm} from '@angular/forms';
import {InvitationService} from '../../../services/invitation.service';
import {AccountService} from "../../../services/account.service";
import {GroupService} from "../../../services/group.service";
import {HttpGroupService} from "../../../services/httpServices/http-group.service";
import {ErrorService} from "../../../services/error.service";

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
              private accountService: AccountService, private httpGroupService: HttpGroupService, private errorService: ErrorService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.createGroup(this.ownerId, this.form.value.groupName);
    this.form.reset();
    this.popupService.close(this.id);
  }

  createGroup(currentUserId: number, groupName: string): void{
    this.httpGroupService.createGroupByUserIdAndGroupName(currentUserId, groupName)
      .subscribe({
        next: group => {
          this.groupService.addGroup(group);
          this.groupService.selectGroup(group);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }

  onCancel(): void {
    this.form.reset();
    this.popupService.close(this.id);
  }

}
