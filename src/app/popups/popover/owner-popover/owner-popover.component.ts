import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-owner-popover',
  templateUrl: './owner-popover.component.html'
})
export class OwnerPopoverComponent implements OnInit {
  isAdmin;

  ngOnInit(): void {
    // check if user is admin -> pass member from memberlist to popup-component
  }
}
