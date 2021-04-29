import { Injectable } from '@angular/core';
import {HttpInvitationService} from './httpServices/http-invitation.service';
import {DataService} from './data.service';
import {InvitationResponse} from '../entities/invitationResponse.model';

@Injectable({
  providedIn: 'root'
})
export class UserInvitationService {

  pendingInvitations: InvitationResponse[];
  constructor(
    private httpInvitationService: HttpInvitationService,
    private dataService: DataService)
   {
    this.loadInvitations();
  }
  loadInvitations(): void{
    this.httpInvitationService.loadInvitationsByUserId(this.dataService.userId).subscribe({
      next: invitations => {
        this.pendingInvitations =  invitations;
      },
      error: error => {
        this.dataService.handleError(error);
      }
    });
  }
  acceptInvitationClick(toAcceptInvitationResponse: InvitationResponse): void {
    this.httpInvitationService.answerInvitationByInvitationId(toAcceptInvitationResponse.id, true)
      .subscribe({
      next: response => {
        this.pendingInvitations = this.pendingInvitations.filter(invitationResponse => invitationResponse !== toAcceptInvitationResponse);
      },
      error: error => {
        this.dataService.handleError(error);
      }
    });
  }
  declineInvitationClick(toDeclineInvitationResponse: InvitationResponse): void {
    this.httpInvitationService.answerInvitationByInvitationId(toDeclineInvitationResponse.id, false)
      .subscribe({
      next: response => {
        this.pendingInvitations = this.pendingInvitations.filter(invitationResponse => invitationResponse !== toDeclineInvitationResponse);
      },
      error: error => {
        this.dataService.handleError(error);
      }
    });
  }
}
