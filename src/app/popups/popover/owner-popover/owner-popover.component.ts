import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-owner-popover',
  templateUrl: './owner-popover.component.html'
})
export class OwnerPopoverComponent implements OnInit {
  adminMessage;

  ngOnInit(): void {
    // check if user is admin -> pass member from memberlist to popup-component
    this.adminMessage = "Grant admin role";
    // if member is already admin
    // this.adminMessage = "Revoke admin role";
  }
}
