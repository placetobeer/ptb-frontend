import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-base-popup-button-bar',
  templateUrl: './base-popup-button-bar.component.html',
  styleUrls: ['./base-popup-button-bar.component.css']
})
export class BasePopupButtonBarComponent implements OnInit {

  @Output() buttonClick: EventEmitter<string> = new EventEmitter<string>();
  @Input() buttonMap: Map<string, string>;

  constructor() { }

  ngOnInit(): void {
    if (this.buttonMap == null){
      // todo error popup
    }
  }

  onButtonClick(eventName: any): void {
    this.buttonClick.emit(eventName);
  }
}
