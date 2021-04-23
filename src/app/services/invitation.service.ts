import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Invitation} from '../requests/invitation-request.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  invitationEmitter = new Subject<Invitation>();
  invitationList: Invitation[] = [];
  invitationChanged = new Subject<Invitation[]>();
  constructor() { }

  addInvitation(newInvitation: Invitation): void {
    this.invitationList.push(newInvitation);
    this.invitationChanged.next(this.invitationList.slice());
    this.invitationEmitter.next(newInvitation);
  }

  getInvitations(): Invitation[]{
    return this.invitationList.slice();
  }
}
