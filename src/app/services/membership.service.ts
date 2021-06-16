import {Injectable, OnDestroy} from '@angular/core';
import {HttpMembershipService} from "./httpServices/http-membership.service";
import {ErrorService} from "./error.service";
import {GroupsMembership} from "../entities/groupsMembership.model";
import {GroupRole} from "../entities/groupRole.enum";
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {startWith} from "rxjs/operators";
import {GroupService} from "./group.service";
import {AccountService} from "./account.service";
import {Group} from "../entities/group.model";

@Injectable({
  providedIn: 'root'
})
export class MembershipService implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private httpMembershipService: HttpMembershipService, private errorService: ErrorService,
              private groupService: GroupService, private accountService: AccountService) { }

  private readonly groupMembershipsSubject = new BehaviorSubject<GroupsMembership[]>([]);
  public readonly groupMemberships$ = this.groupMembershipsSubject.asObservable();

  private readonly currentUserMembershipSubject = new BehaviorSubject<GroupsMembership>(null);
  public readonly currentUserMembership$ = this.currentUserMembershipSubject.asObservable();

  private readonly autoRefreshSubscription =  interval(30000).pipe(startWith(0)).subscribe(() => {
    this.getCurrentGroupMemberships();
  });

  get groupMemberships(): GroupsMembership[] {
    return this.groupMembershipsSubject.value;
  }

  get userMembership(): GroupsMembership {
    return this.currentUserMembershipSubject.value;
  }

  checkIfUserIsOwner(): boolean {
    return this.userMembership.role === GroupRole.OWNER;
  }

  checkIfUserIsAdmin(): boolean {
    return this.userMembership.role === GroupRole.ADMIN;
  }

  checkIfUserIsMember(): boolean {
    return this.userMembership.role === GroupRole.MEMBER;
  }

  getCurrentGroupMemberships(): void {
    if (this.groupService.currentGroup !== null) {
      this.loadGroupMemberships();
    }
  }

  setUserMembership(): void {
    this.loadUserMembership(this.accountService.user.id, this.groupService.currentGroup.id);
  }

  removeMembershipFromList(toDeleteMembership: GroupsMembership): void {
    const newGroupMemberships = this.groupMemberships.filter(
      groupMemberships => groupMemberships.membershipId !== toDeleteMembership.membershipId);
    this.groupMembershipsSubject.next(newGroupMemberships);
  }

  loadGroupMemberships(): void {
    const currentGroupId = this.groupService.currentGroup.id;
    const subscription = this.httpMembershipService.loadUserMembershipsByGroupId(currentGroupId)
      .subscribe({
        next: groupMemberships => {
          this.groupMembershipsSubject.next(groupMemberships);
          this.setUserMembership();
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  loadUserMembership(userId: number, groupId: number): void {
    const subscription = this.httpMembershipService.loadUserMembershipByUserIdAndGroupId(userId, groupId)
      .subscribe({
        next: userMembership => {
          this.currentUserMembershipSubject.next(userMembership);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.autoRefreshSubscription.unsubscribe();
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
