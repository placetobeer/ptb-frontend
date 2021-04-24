import { Injectable } from '@angular/core';
import {Invitation} from '../requests/invitation-request.model';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  invitations: Invitation[] = [];
  constructor() { }

  addInvitation(newInvitation: Invitation): void {
    this.invitations.push(newInvitation);
  }

}
