import { Component, OnInit } from '@angular/core';
import {PopupService} from '../../popups/popup.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-navigation-bar',
  templateUrl: './group-navigation-bar.component.html',
  styleUrls: ['./group-navigation-bar.component.css']
})
export class GroupNavigationBarComponent implements OnInit {

  constructor(private popupService: PopupService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateGroup(): void {
    this.router.navigate(['/hubpage/new']);
  }
}
