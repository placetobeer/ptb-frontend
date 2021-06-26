import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../core/services/group.service";

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {

  constructor(public groupService: GroupService) { }

  ngOnInit(): void {
  }
}
