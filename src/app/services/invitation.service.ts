import { Injectable } from '@angular/core';
import {InvitationRequest} from '../requests/invitation-request.model';
import {Invitation} from '../entities/invitation.model';
import {User} from '../entities/user.model';
import {HttpInvitationService} from './httpServices/http-invitation.service';
import {AccountService} from "./account.service";
import {GroupService} from "./group.service";
import {BehaviorSubject} from "rxjs";
import {Group} from "../entities/group.model";
import {ErrorService} from "./error.service";
import {distinctUntilChanged} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InvitationService {

  constructor(private httpInvitationService: HttpInvitationService, private accountService: AccountService,
              private groupService: GroupService, private errorService: ErrorService) { }

  private readonly invitationsSubject = new BehaviorSubject<Invitation[]>(null);
  public readonly invitations$ = this.invitationsSubject.asObservable();

  private readonly pendingInvitationsSubject = new BehaviorSubject<Invitation[]>(null);
  public readonly pendingInvitations$ = this.pendingInvitationsSubject.asObservable();

  owner = this.accountService.user;

  get invitations(): Invitation[] {
    return this.invitationsSubject.value;
  }

  get pendingInvitations(): Invitation[] {
    return this.pendingInvitationsSubject.value;
  }

  addInvitation(newInvitation: Invitation): void {
    this.invitationsSubject.next([
      newInvitation
    ]);
    // todo think about adding here duplication check
    // let message = '';
    // this.invitations$.pipe(distinctUntilChanged(this.invitations, newInvitation)).subscribe({
    //   next: invitations => {
    //     this.invitationsSubject.next([newInvitation]);
    //   },
    //   error: err => {
    //     message = 'hohh';
    //   },
    // });
  }

  removeInvitation(toDeleteInvitation: Invitation): void {
    const newInvitations = this.invitations.filter(element => element !== toDeleteInvitation);
    this.invitationsSubject.next(newInvitations);
  }

  sendInvitationRequest(groupId: number): void {
    const invitationRequest = new InvitationRequest(groupId, this.owner, this.invitations);
    this.httpInvitationService.sendInvitations(invitationRequest)
      .subscribe({
        next: invitations => {
          for (const invitation of invitations) {
            this.pendingInvitations.push(invitation);
            console.log(invitation);
          }
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }

}
