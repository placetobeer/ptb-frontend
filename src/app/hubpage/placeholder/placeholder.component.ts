import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {PopupService} from '../../popups/popup.service';
import {GroupService} from "../../services/group.service";

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
