import {Injectable, OnDestroy} from '@angular/core';
import {Group} from '../entities/group.model';
import {BehaviorSubject, interval, merge, Subject} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';
import {HttpGroupService} from './httpServices/http-group.service';
import {AccountService} from './account.service';

@Injectable({
  providedIn: 'root'
})
export class GroupService{

  constructor(private httpGroupService: HttpGroupService, private accountService: AccountService) { }

  groupEmitter: Subject<Group[]> = new Subject<Group[]>();

  private readonly autoRefresh$ =  interval(120000).pipe(
    startWith(0)
  );

  public readonly groupList$ = merge(
    this.autoRefresh$.pipe(
      switchMap(() =>  this.httpGroupService.loadGroupsByUserId(this.accountService.user.id))),
    this.groupEmitter);

  currentGroup: Subject<Group> = new Subject<Group>();

  const subject = new BehaviorSubject(undefined);
  this.groupList$.subscribe(subject);

  selectGroup(groupId: number): void {


    subject.getValue()
    for ( group of subject.getValue() ) {

    }
  }
}
