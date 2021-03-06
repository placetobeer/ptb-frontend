import {Injectable, OnDestroy} from '@angular/core';
import {InvitationRequest} from '../model/requests/invitation-request.model';
import {Invitation} from '../model/entities/invitation.model';
import {User} from '../model/entities/user.model';
import {HttpInvitationService} from '../httpServices/http-invitation.service';
import {AccountService} from "./account.service";
import {GroupService} from "./group.service";
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {Group} from "../model/entities/group.model";
import {ErrorService} from "./error.service";
import {distinctUntilChanged, filter, map, startWith} from "rxjs/operators";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {GroupInvitation} from "../model/entities/groupInvitation.model";

@Injectable({
  providedIn: 'root'
})
export class InvitationService implements OnDestroy{

  private subscriptions: Subscription[] = [];

  constructor(private httpInvitationService: HttpInvitationService, private accountService: AccountService,
              private groupService: GroupService, private errorService: ErrorService) { }

  private readonly invitationsSubject = new BehaviorSubject<Invitation[]>([]);
  public readonly invitations$ = this.invitationsSubject.asObservable();

  private readonly groupInvitationsSubject = new BehaviorSubject<GroupInvitation[]>([]);
  public readonly groupInvitations$ = this.groupInvitationsSubject.asObservable();

  // private readonly groupInvitationsIdSubject = new BehaviorSubject<number[]>([]);
  // public readonly groupInvitationsId$ = this.groupInvitationsIdSubject.asObservable();

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
    const invitationRequest = new InvitationRequest(groupId, this.accountService.user, this.invitations);
    const subscription = this.httpInvitationService.sendInvitations(invitationRequest)
      .subscribe({
        next: invitations => {
          console.log(invitations);
          for (const invitation of invitations){
            console.log(invitation);
            this.addGroupInvitations(new GroupInvitation(invitation.id, invitation.email, null, invitation.role));
          }
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

  get groupInvitations(): GroupInvitation[] {
    return this.groupInvitationsSubject.value;
  }

  addGroupInvitations(newGroupInvitation: GroupInvitation): void {
    this.groupInvitationsSubject.next([
      ...this.groupInvitations,
      newGroupInvitation
    ]);
  }

  clearGroupInvitations(): void {
    this.groupInvitationsSubject.next([]);
  }

  loadGroupInvitations(groupId: number): void {
    this.clearGroupInvitations();
    const subscription = this.httpInvitationService.loadInvitationsByGroupId(groupId).subscribe({
      next: groupInvitations => {
        groupInvitations.forEach(groupInvitation => this.addGroupInvitations(groupInvitation));
      },
      error: error => {
        this.errorService.handleError(error);
      }
    });
    this.subscriptions.push(subscription);
  }
}
