import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../popups/popup.service';

@Component({
  selector: 'app-group-navigation-bar',
  templateUrl: './group-navigation-bar.component.html',
  styleUrls: ['./group-navigation-bar.component.css']
})
export class GroupNavigationBarComponent implements OnInit {

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
  }

  createGroupClick(): void {
    this.popupService.open('create-group');
  }
}
