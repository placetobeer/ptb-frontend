import {Component, Input, OnInit} from '@angular/core';
import {ActivityType} from "../../../../core/model/entities/activityType.enum";

@Component({
  selector: 'app-proposal-item',
  templateUrl: './proposal-item.component.html'
})
export class ProposalItemComponent implements OnInit {

  @Input() proposalName: string;
  @Input() activityType: ActivityType;

  constructor() { }

  ngOnInit(): void {
  }

}
