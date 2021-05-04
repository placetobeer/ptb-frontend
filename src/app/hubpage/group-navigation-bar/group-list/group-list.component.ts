import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Group} from '../../../entities/group.model';
import {GroupService} from '../../../services/group.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(public groupService: GroupService, private router: Router) { }

  ngOnInit(): void {
  }

  changeSelectedGroup(group: Group): void {
    this.router.navigate(['/hubpage', group.id]);
  }
}
