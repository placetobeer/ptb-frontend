import {Component, Input, OnInit} from '@angular/core';
import {PopoverInterface} from "../popover.interface";
import {GroupRole} from "../../../entities/groupRole.enum";

@Component({
  selector: 'app-owner-popover',
  templateUrl: './owner-popover.component.html'
})
export class OwnerPopoverComponent implements PopoverInterface {
  @Input() data: any;
}
