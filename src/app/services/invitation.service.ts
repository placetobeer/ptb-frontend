import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Invitation} from '../requests/invitation-request.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  invitationDataEmitter = new Subject<Invitation>();
  constructor() { }

  transferInvitationData(newInvitation: Invitation): void {
    this.invitationDataEmitter.next(newInvitation);
  }

}
