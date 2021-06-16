import {Injectable, OnDestroy} from '@angular/core';
import {Group} from '../entities/group.model';
import {BehaviorSubject, defer, iif, interval, merge, Observable, of, Subject, Subscription} from 'rxjs';
import {defaultIfEmpty, exhaustMap, filter, find, map, mapTo, startWith, switchMap} from 'rxjs/operators';
import {HttpGroupService} from './httpServices/http-group.service';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";
import {AccountService} from './account.service';
import {ErrorService} from './error.service';
import {MembershipService} from './membership.service';
import {CurrentGroupSelector} from "../state-management/currentGroupSelector.context";
import {CurrentGroupEmpty} from "../state-management/currentGroupEmpty.state";
import {CurrentGroupSelected} from "../state-management/currentGroupSelected.state";
import {ProposalService} from "./proposal.service";

@Injectable({
  providedIn: 'root'
})
export class GroupService implements OnDestroy{

  private subscriptions: Subscription[] = [];

  constructor(private httpGroupService: HttpGroupService, private accountService: AccountService, private errorService: ErrorService,
              private currentGroupSelector: CurrentGroupSelector)
  {
    this.loadUserGroups();
  }

  private readonly autoRefreshSubscription =  interval(30000).pipe(startWith(0)).subscribe(() => {
    this.loadUserGroups();
  });

  private readonly groupListSubject = new BehaviorSubject<Group[]>([]);
  public readonly groupList$ = this.groupListSubject.asObservable().pipe(
    filter(isNotNullOrUndefined),
    map(groups => groups.filter(group => group.id !== this.getCurrentGroupId()))
  );

  private readonly currentGroupSubject = new BehaviorSubject<Group>(null);
  public readonly currentGroup$ = this.currentGroupSubject.asObservable();

  get groups(): Group[] {
    return this.groupListSubject.value;
  }

  get currentGroup(): Group {
    return this.currentGroupSubject.value;
  }

  getCurrentGroupId(): number {
    if (this.currentGroup !== null) {
      return this.currentGroup.id;
    }
    return -1;
  }

  setCurrentGroupName(newGroupName: string): void {
    if (this.currentGroup !== null) {
      this.currentGroup.name = newGroupName;
    }
  }

  setCurrentGroupState(): void {
    if (this.currentGroup !== null) {
      const stateSelected = new CurrentGroupSelected(this.currentGroupSelector);
      stateSelected.setSelectorState();
    } else {
      const stateEmpty = new CurrentGroupEmpty(this.currentGroupSelector);
      stateEmpty.setSelectorState();
    }
  }

  addGroup(group: Group): void{
    this.groupListSubject.next([
      ...this.groups,
      group
    ]);
  }

  getGroup(groupId: number): Group {
    return this.groups.find(group => group.id === groupId);
  }

  selectGroup(group: Group): void {
    this.currentGroupSubject.next(group);
    this.loadUserGroups();
  }

  removeGroupFromList(toDeleteGroup: Group): void {
    const newGroups = this.groups.filter(groups => groups.id !== toDeleteGroup.id);
    this.groupListSubject.next(newGroups);
    this.currentGroupSubject.next(null);
  }

  loadUserGroups(): void {
    const subscription = this.httpGroupService.loadGroupsByUserId(this.accountService.user.id).subscribe({
      next: groups => {
        this.groupListSubject.next(groups);
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
