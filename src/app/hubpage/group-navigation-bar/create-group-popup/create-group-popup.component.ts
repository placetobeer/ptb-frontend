import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {DataService} from '../../../services/data.service';
import {NgForm} from '@angular/forms';
import {InvitationRequest} from '../../../requests/invitation-request.model';
import {InvitationService} from '../../../services/invitation.service';
import {HttpGroupService} from "../../../services/httpServices/http-group.service";

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  id = 'create-group';
  // TODO: replace Mock
  ownerId = 4;

  constructor(private popupService: PopupService, public invitationService: InvitationService,
              private httpGroupService: HttpGroupService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.createGroup(this.ownerId, this.form.value.groupName);
    // TODO send request after successfully saved group
    // TODO subscribe on Promise with promise.then((res) => {})
    this.invitationService.sendInvitationRequest();
    console.log('sendInvitationRequest Methode wurde aufgerufen');
    this.form.reset();
    this.popupService.close(this.id);
  }

  createGroup(currentUserId: number, groupName: string): void{
    // TODO wrap in Promise -> subscribe in create-group-popup to promise for invitationRequest; next: resolve; error: reject
    const createGroupAnswer = new Promise((resolve, reject) => {
      this.httpGroupService.createGroupByUserIdAndGroupName(currentUserId, groupName)
        .subscribe({
          next: group => {
            resolve(this.userGroups.push(group));
            resolve(this.selectGroup(group));
          },
          error: error => {
            reject(this.handleError(error));
          }
        });
    });
  }

  onCancel(): void {
    this.form.reset();
    this.popupService.close(this.id);
  }

}
