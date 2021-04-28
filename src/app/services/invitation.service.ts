import { Injectable } from '@angular/core';
import {InvitationRequest} from '../requests/invitation-request.model';
import {Invitation} from '../entities/invitation.model';
import {DataService} from './data.service';
import {User} from '../entities/user.model';
import {HttpInvitationService} from './httpServices/http-invitation.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  invitations: Invitation[] = [];
  pendingInvitations: Invitation[] = [];
  // TODO replace Mock
  owner = new User(22, 'Hugo Boss');
  selectedGroupId = 44;

  constructor(private dataService: DataService, private httpInvitationService: HttpInvitationService) { }

  addInvitation(newInvitation: Invitation): void {
    this.invitations.push(newInvitation);
  }

  sendInvitationRequest(): void {
    const invitationRequest = new InvitationRequest(this.selectedGroupId, this.owner, this.invitations);
    this.httpInvitationService.sendInvitations(invitationRequest)
      .subscribe({
        next: invitations => {
          for (const invitation of invitations) {
            this.pendingInvitations.push(invitation);
            console.log(invitation);
          }
        },
        error: error => {
          this.dataService.handleError(error);
        }
      });
  }

}
