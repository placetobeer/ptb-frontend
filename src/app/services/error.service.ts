import {Injectable, OnDestroy} from '@angular/core';
import {GroupService} from './group.service';
import {merge} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PopupHelperService} from '../popups/popup-helper.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService implements OnDestroy {

  constructor(private groupService: GroupService, private popupHelperService: PopupHelperService) {}

  private readonly errorSubscription = merge([this.groupService.groupList$]).subscribe({
    error: error => {
      this.handleError(error);
    }});

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  handleError(error: HttpErrorResponse): void {
    this.popupHelperService.openError(error.message + '\n' + '\n' + error.error);
    console.error('There was an error!', error);
  }
}
