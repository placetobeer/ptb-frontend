import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {Group} from '../../../entities/group.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  changeSelectedGroup(group: Group): void {
    this.dataService.selectGroup(group);
  }
}
