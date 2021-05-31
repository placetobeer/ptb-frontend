import {Injectable, OnDestroy} from '@angular/core';
import {Group} from "../entities/group.model";
import {HttpMembershipService} from "./httpServices/http-membership.service";
import {ErrorService} from "./error.service";
import {GroupsMembership} from "../entities/groupsMembership.model";
import {GroupRole} from "../entities/groupRole.enum";
import {BehaviorSubject, interval} from "rxjs";
import {filter, map, startWith} from "rxjs/operators";
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {GroupService} from "./group.service";
import {User} from "../entities/user.model";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class MembershipService implements OnDestroy {

  constructor(private httpMembershipService: HttpMembershipService, private errorService: ErrorService,
              private groupService: GroupService, private accountService: AccountService) { }

  // TODO: no filtering -> list with owner?
  private readonly groupMembershipsSubject = new BehaviorSubject<GroupsMembership[]>([]);
  public readonly groupMemberships$ = this.groupMembershipsSubject.asObservable().pipe(
    filter(isNotNullOrUndefined),
    map(groupMembers => groupMembers.filter(groupMember => groupMember.role !== GroupRole.OWNER))
  );

  private readonly ownerMembershipSubject = new BehaviorSubject<GroupsMembership>(null);
  public readonly ownerMembership$ = this.ownerMembershipSubject.asObservable();

  private readonly userMembershipSubject = new BehaviorSubject<GroupsMembership>(null);
  public readonly userMembership$ = this.userMembershipSubject.asObservable();

  private readonly autoRefreshSubscription =  interval(120000).pipe(startWith(0)).subscribe(() => {
    this.getCurrentGroupMemberships();
  });

  get groupMemberships(): GroupsMembership[] {
    return this.groupMembershipsSubject.value;
  }

  get owner(): GroupsMembership {
    return this.ownerMembershipSubject.value;
  }

  get userMembership(): GroupsMembership {
    return this.userMembershipSubject.value;
  }

  private setOwner(): void {
    const owner = this.groupMemberships.find(groupMember => groupMember.role === GroupRole.OWNER);
    this.ownerMembershipSubject.next(owner);
  }

  getCurrentGroupMemberships(): void {
    if (this.groupService.currentGroup !== null) {
      this.loadGroupMemberships();
    }
  }

  setUserMembership(): void {
    this.loadUserMembership(this.accountService.user.id, this.groupService.currentGroup.id);
  }

  loadGroupMemberships(): void {
    const currentGroupId = this.groupService.currentGroup.id;
    this.httpMembershipService.loadUserMembershipsByGroupId(currentGroupId)
      .subscribe({
        next: groupMemberships => {
          this.groupMembershipsSubject.next(groupMemberships);
          this.setOwner();
          this.setUserMembership();
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }

  loadUserMembership(userId: number, groupId: number): void {
    this.httpMembershipService.loadUserMembershipByUserIdAndGroupId(userId, groupId)
      .subscribe({
        next: userMembership => {
          this.userMembershipSubject.next(userMembership);
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
  }

  ngOnDestroy(): void {
    this.autoRefreshSubscription.unsubscribe();
  }
}
