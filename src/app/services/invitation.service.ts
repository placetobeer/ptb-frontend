import { Injectable } from '@angular/core';
import {InvitationRequest} from '../requests/invitation-request.model';
import {Invitation} from '../entities/invitation.model';

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
