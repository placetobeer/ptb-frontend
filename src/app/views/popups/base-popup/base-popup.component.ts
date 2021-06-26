import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PopupService} from '../../../core/services/popup.service';

@Component({
  selector: 'app-base-popup',
  templateUrl: './base-popup.component.html',
  styleUrls: ['./base-popup.component.css']
})
export class BasePopupComponent implements OnInit {
  @Input() id;

  constructor(private popupService: PopupService) {
  }

  ngOnInit(): void {
    if (this.id == null){
      // todo error popup
    }
  }

  close(): void {
    this.popupService.close(this.id);
  }
}
