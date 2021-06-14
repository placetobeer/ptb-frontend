import {Injectable, OnDestroy} from '@angular/core';
import {InvitationRequest} from '../requests/invitation-request.model';
import {Invitation} from '../entities/invitation.model';
import {User} from '../entities/user.model';
import {HttpInvitationService} from './httpServices/http-invitation.service';
import {AccountService} from "./account.service";
import {GroupService} from "./group.service";
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {Group} from "../entities/group.model";
import {ErrorService} from "./error.service";
import {distinctUntilChanged, filter, map, startWith} from "rxjs/operators";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Injectable({
  providedIn: 'root'
})
export class InvitationService implements OnDestroy{

  private subscriptions: Subscription[] = [];

  constructor(private httpInvitationService: HttpInvitationService, private accountService: AccountService,
              private groupService: GroupService, private errorService: ErrorService) { }

  private readonly invitationsSubject = new BehaviorSubject<Invitation[]>([]);
  public readonly invitations$ = this.invitationsSubject.asObservable();

  owner = this.accountService.user;

  private readonly autoRefreshSubscription =  interval(30000).pipe(startWith(0)).subscribe(() => {
    // this.loadInvitations();
  });

  get invitations(): Invitation[] {
    return this.invitationsSubject.value;
  }

  addInvitation(newInvitation: Invitation): void {
    this.invitationsSubject.next([
      ...this.invitations,
      newInvitation
    ]);
  }

  removeInvitation(toDeleteInvitation: Invitation): void {
    const newInvitations = this.invitations.filter(element => element !== toDeleteInvitation);
    this.invitationsSubject.next(newInvitations);
  }

  removeAllInvitations(): void {
    const initEmptyValue = [];
    this.invitationsSubject.next(initEmptyValue);
  }

  sendInvitationRequest(groupId: number): void {
    const invitationRequest = new InvitationRequest(groupId, this.owner, this.invitations);
    const subscription = this.httpInvitationService.sendInvitations(invitationRequest)
      .subscribe({
        next: invitations => {
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    // this.autoRefreshSubscription.unsubscribe();
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
