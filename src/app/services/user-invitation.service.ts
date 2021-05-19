import { Injectable } from '@angular/core';
import {HttpInvitationService} from './httpServices/http-invitation.service';
import {InvitationResponse} from '../entities/invitationResponse.model';
import {ErrorService} from "./error.service";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class UserInvitationService {

  pendingInvitations: InvitationResponse[];

  constructor(private httpInvitationService: HttpInvitationService, private errorService: ErrorService,
              private accountService: AccountService)
   {
    this.loadInvitations();
  }

  loadInvitations(): void{
    this.httpInvitationService.loadInvitationsByUserId(this.accountService.user.id).subscribe({
      next: invitations => {
        this.pendingInvitations =  invitations;
      },
      error: error => {
        this.errorService.handleError(error);
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
        this.errorService.handleError(error);
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
        this.errorService.handleError(error);
      }
    });
  }
}
