import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.css']
})
export class GroupItemComponent implements OnInit {
  @Input() groupName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
