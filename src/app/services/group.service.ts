import {Injectable, OnDestroy} from '@angular/core';
import {Group} from '../entities/group.model';
import {BehaviorSubject, defer, iif, interval, merge, Observable, of, Subject} from 'rxjs';
import {defaultIfEmpty, exhaustMap, filter, find, map, mapTo, startWith, switchMap} from 'rxjs/operators';
import {HttpGroupService} from './httpServices/http-group.service';
import {AccountService} from './account.service';
import {HttpParams} from '@angular/common/http';
import {ErrorService} from './error.service';
import {isNotNullOrUndefined} from "codelyzer/util/isNotNullOrUndefined";

@Injectable({
  providedIn: 'root'
})
export class GroupService implements OnDestroy{

  constructor(private httpGroupService: HttpGroupService, private accountService: AccountService, private errorService: ErrorService) { }

  private readonly autoRefreshSubscription =  interval(120000).pipe(startWith(0)).subscribe(() => {
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

  deleteGroup(toDeleteGroup: Group): void {
      this.httpGroupService.deleteGroupByGroupId(toDeleteGroup.id)
        .subscribe({
          next: response => {
              this.removeGroupFromList(toDeleteGroup);
              this.selectGroup(null);
          },
          error: error => {
            this.errorService.handleError(error);
          }
        });
  }

  removeGroupFromList(toDeleteGroup: Group): void {
    const newGroups = this.groups.filter(groups => groups.id !== toDeleteGroup.id);
    this.groupListSubject.next(newGroups);
    this.currentGroupSubject.next(null);
  }

  loadUserGroups(): void {
    this.httpGroupService.loadGroupsByUserId(this.accountService.user.id).subscribe({
      next: groups => {
        this.groupListSubject.next(groups);
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
