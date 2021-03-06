import {Component, Input, OnInit} from '@angular/core';
import { PopupService} from '../../../../core/services/popup.service';
import {PopupHelperService} from '../../../../core/services/popup-helper.service';

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

  onCancel(): void {
    this.popupService.close(this.id);
  }
}
