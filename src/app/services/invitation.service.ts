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
import {GroupInvitation} from "../entities/groupInvitation.model";

@Injectable({
  providedIn: 'root'
})
export class InvitationService implements OnDestroy{

  private subscriptions: Subscription[] = [];

  constructor(private httpInvitationService: HttpInvitationService, private accountService: AccountService,
              private groupService: GroupService, private errorService: ErrorService) { }

  private readonly invitationsSubject = new BehaviorSubject<Invitation[]>([]);
  public readonly invitations$ = this.invitationsSubject.asObservable();

  private readonly groupInvitationsSubject = new BehaviorSubject<Invitation[]>([]);
  public readonly groupInvitations$ = this.groupInvitationsSubject.asObservable();

  private readonly groupInvitationsIdSubject = new BehaviorSubject<number[]>([]);
  public readonly groupInvitationsId$ = this.groupInvitationsIdSubject.asObservable();

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

  get groupInvitations(): Invitation[] {
    return this.groupInvitationsSubject.value;
  }

  addGroupInvitations(newGroupInvitation: Invitation): void {
    this.groupInvitationsSubject.next([
      ...this.groupInvitations,
      newGroupInvitation
    ]);
  }

  clearGroupInvitations(): void {
    this.groupInvitationsSubject.next([]);
  }

  get groupInvitationsId(): number[] {
    return this.groupInvitationsIdSubject.value;
  }

  addGroupInvitationsId(newGroupInvitationsId: number): void {
    this.groupInvitationsIdSubject.next([
      ...this.groupInvitationsId,
      newGroupInvitationsId
    ]);
  }

  clearGroupInvitationsId(): void {
    this.groupInvitationsIdSubject.next([]);
  }

  addFusionGroupInvitations(groupInvitation: GroupInvitation): void{
    this.addGroupInvitationsId(groupInvitation.id);
    this.addGroupInvitations(new Invitation(groupInvitation.mail, groupInvitation.grantAdmin));
  }

  loadGroupInvitations(groupId: number): void {
    this.clearGroupInvitations();
    this.clearGroupInvitationsId();
    const subscription = this.httpInvitationService.loadInvitationsByGroupId(groupId).subscribe({
      next: groupInvitations => {
        groupInvitations.forEach(groupInvitation => this.addFusionGroupInvitations(groupInvitation));
      },
      error: error => {
        this.errorService.handleError(error);
      }
    });
    this.subscriptions.push(subscription);
  }
}
