import {Injectable, OnDestroy} from '@angular/core';
import {GroupService} from './group.service';
import {merge} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PopupHelperService} from './popup-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private popupHelperService: PopupHelperService) {}

  handleError(error: HttpErrorResponse): void {
    this.popupHelperService.openError(error.message + '\n' + '\n' + error.error);
    console.error('There was an error!', error);
  }
}
