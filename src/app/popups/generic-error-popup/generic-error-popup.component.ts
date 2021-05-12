import {Component, Input, OnInit} from '@angular/core';
import { PopupService} from '../popup.service';
import {PopupHelperService} from '../popup-helper.service';

@Component({
  selector: 'app-generic-error-popup',
  templateUrl: './generic-error-popup.component.html',
  styleUrls: ['./generic-error-popup.component.css']
})
export class GenericErrorPopupComponent implements OnInit {
  id = 'generic-error-popup';
  errorMessage: string;
  constructor(private popupService: PopupService, private popuphelperService: PopupHelperService) {
  }

  ngOnInit(): void {
    this.popuphelperService.messageSubject.subscribe({
      next: message =>  {this.errorMessage = message; }
    });
  }
  cancel(): void {
    this.popupService.close(this.id);
  }
}
