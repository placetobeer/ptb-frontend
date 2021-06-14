import { Injectable } from '@angular/core';
import {HttpInvitationService} from './httpServices/http-invitation.service';
import {InvitationResponse} from '../entities/invitationResponse.model';
import {ErrorService} from "./error.service";
import {AccountService} from "./account.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInvitationService {

  private readonly pendingInvitationsSubject = new BehaviorSubject<InvitationResponse[]>([]);
  public readonly pendingInvitations$ = this.pendingInvitationsSubject.asObservable();

  constructor(private httpInvitationService: HttpInvitationService, private errorService: ErrorService,
              private accountService: AccountService)
   {
    this.loadInvitations();
  }

  get pendingInvitations(): InvitationResponse[] {
    return this.pendingInvitationsSubject.value;
  }

  addPendingInvitation(newInvitation: InvitationResponse): void {
    this.pendingInvitationsSubject.next([
      ...this.pendingInvitations,
      newInvitation
    ]);
  }

  clearPendingInvitations(): void{
    this.pendingInvitationsSubject.next([]);
  }

  loadInvitations(): void{
    this.httpInvitationService.loadInvitationsByUserId(this.accountService.user.id).subscribe({
      next: invitations => {
        invitations.forEach(invitation => this.addPendingInvitation(invitation));
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
        // const filteredInvitations = this.pendingInvitations.filter(
        // invitationResponse => invitationResponse !== toAcceptInvitationResponse);
        // filteredInvitations.forEach(invitation => this.addPendingInvitation(invitation));
        this.clearPendingInvitations();
        this.loadInvitations();
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
        // const filteredInvitations = this.pendingInvitations
        //  .filter(invitationResponse => invitationResponse !== toDeclineInvitationResponse);
        // filteredInvitations.forEach(invitation => this.addPendingInvitation(invitation));
        this.clearPendingInvitations();
        this.loadInvitations();
      },
      error: error => {
        this.errorService.handleError(error);
      }
    });
  }
}
