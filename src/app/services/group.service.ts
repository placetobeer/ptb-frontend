import {Injectable, OnDestroy} from '@angular/core';
import {Group} from '../entities/group.model';
import {BehaviorSubject, interval, merge, Observable, Subject} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {HttpGroupService} from './httpServices/http-group.service';
import {AccountService} from './account.service';
import {HttpParams} from '@angular/common/http';
import {ErrorService} from './error.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService implements OnDestroy{

  constructor(private httpGroupService: HttpGroupService, private accountService: AccountService, private errorService: ErrorService) { }

  private readonly autoRefreshSubscription =  interval(120000).pipe(startWith(0)).subscribe(() => {
    this.loadUserGroups();
  });

  private readonly groupListSubject = new BehaviorSubject<Group[]>([]);
  public readonly groupList$ = this.groupListSubject.asObservable();

  private readonly nonSelectedGroupsSubject = new BehaviorSubject<Group[]>([]);
  public readonly nonSelectedGroups$ = this.nonSelectedGroupsSubject.asObservable();

  private readonly currentGroupSubject = new BehaviorSubject<Group>(null);
  public readonly currentGroup$ = this.currentGroupSubject.asObservable();

  get groups(): Group[] {
    return this.groupListSubject.value;
  }

  get currentGroup(): Group {
    return this.currentGroupSubject.value;
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
    this.generateNonSelectedGroups();
  }

  generateNonSelectedGroups(): void {
    if (this.groups != null && this.currentGroup != null) {
      const nonSelectedGroups = this.groups.filter(groups => groups.id !== this.currentGroup.id);
      this.nonSelectedGroupsSubject.next(nonSelectedGroups);
    } else {
      this.nonSelectedGroupsSubject.next(this.groups);
    }
  }

  removeGroup(groupId: number): void {
    const newGroups = this.groups.filter(groups => groups.id !== groupId);
    this.groupListSubject.next(newGroups);
    this.currentGroupSubject.next(null);
  }

  loadUserGroups(): void {
    this.httpGroupService.loadGroupsByUserId(this.accountService.user.id).subscribe({
      next: groups => {
        this.groupListSubject.next(groups);
        this.generateNonSelectedGroups();
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
