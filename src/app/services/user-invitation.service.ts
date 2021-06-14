import {Injectable, OnDestroy} from '@angular/core';
import {HttpInvitationService} from './httpServices/http-invitation.service';
import {InvitationResponse} from '../entities/invitationResponse.model';
import {ErrorService} from "./error.service";
import {AccountService} from "./account.service";
import {BehaviorSubject, Subscription} from "rxjs";
import {Invitation} from "../entities/invitation.model";
import {GroupService} from "./group.service";

@Injectable({
  providedIn: 'root'
})
export class UserInvitationService implements OnDestroy {

  private subscriptions: Subscription[] = [];

  private readonly pendingInvitationsSubject = new BehaviorSubject<InvitationResponse[]>([]);
  public readonly pendingInvitations$ = this.pendingInvitationsSubject.asObservable();

  constructor(private httpInvitationService: HttpInvitationService, private errorService: ErrorService,
              private accountService: AccountService,
              private groupService: GroupService)
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
    const subscription = this.httpInvitationService.loadInvitationsByUserId(this.accountService.user.id).subscribe({
      next: invitations => {
        invitations.forEach(invitation => this.addPendingInvitation(invitation));
      },
      error: error => {
        this.errorService.handleError(error);
      }
    });
    this.subscriptions.push(subscription);
  }

  acceptInvitationClick(toAcceptInvitationResponse: InvitationResponse): void {
    const subscription = this.httpInvitationService.answerInvitationByInvitationId(toAcceptInvitationResponse.id, true)
      .subscribe({
      next: response => {
        // const filteredInvitations = this.pendingInvitations.filter(
        // invitationResponse => invitationResponse !== toAcceptInvitationResponse);
        // filteredInvitations.forEach(invitation => this.addPendingInvitation(invitation));
        this.clearPendingInvitations();
        this.loadInvitations();
        this.groupService.loadUserGroups();
      },
      error: error => {
        this.errorService.handleError(error);
      }
    });
    this.subscriptions.push(subscription);
  }

  declineInvitationClick(toDeclineInvitationResponse: InvitationResponse): void {
    const subscription = this.httpInvitationService.answerInvitationByInvitationId(toDeclineInvitationResponse.id, false)
      .subscribe({
      next: response => {
        // const filteredInvitations = this.pendingInvitations
        //  .filter(invitationResponse => invitationResponse !== toDeclineInvitationResponse);
        // filteredInvitations.forEach(invitation => this.addPendingInvitation(invitation));
        this.clearPendingInvitations();
        this.loadInvitations();
        this.groupService.loadUserGroups();
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
