import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {Invitation} from '../../../entities/invitation.model';
import {InvitationService} from '../../../services/invitation.service';

@Component({
  selector: 'app-member-item',
  templateUrl: './member-item.component.html',
  styleUrls: ['./member-item.component.css']
})
export class MemberItemComponent implements OnInit {
  email;

  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
    this.invitationService.invitationEmitter.subscribe(newInvitation => {
      this.email = newInvitation.email;
    });
  }

}
