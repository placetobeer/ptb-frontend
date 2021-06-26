import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-base-popup-header',
  templateUrl: './base-popup-header.component.html',
  styleUrls: ['./base-popup-header.component.css']
})
export class BasePopupHeaderComponent implements OnInit {
  @Output() xPressed = new EventEmitter<null>();

  constructor() { }

  ngOnInit(): void {
  }

}
