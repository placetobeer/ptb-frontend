import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopupService} from '../popup.service';

@Component({
  selector: 'app-base-popup',
  templateUrl: './base-popup.component.html',
  styleUrls: ['./base-popup.component.css']
})
export class BasePopupComponent implements OnInit {
  @Input() id;
  @Input() buttonMap: Map<string, string>;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(private popupService: PopupService) {
  }

  ngOnInit(): void {
    if (this.id == null || this.buttonMap == null){
      // todo error popup
    }
  }

  close(): void {
    this.popupService.close(this.id);
  }

  onButtonClick(eventName: string): void {
    this.buttonClicked.emit(eventName);
  }
}
