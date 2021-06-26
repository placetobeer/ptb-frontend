import { Component, OnInit } from '@angular/core';
import {Group} from '../../../core/model/entities/group.model';
import {GroupService} from '../../../core/services/group.service';
import {Router} from '@angular/router';
import {MembershipService} from "../../../core/services/membership.service";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(public groupService: GroupService, private router: Router, private membershipService: MembershipService) { }

  ngOnInit(): void {
  }

  changeSelectedGroup(group: Group): void {
    this.router.navigate(['/hubpage', group.id]);
    this.groupService.selectGroup(group);
    this.membershipService.getCurrentGroupMemberships();
  }
}
