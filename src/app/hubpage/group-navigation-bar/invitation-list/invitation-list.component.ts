import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {HttpInvitationService} from '../../../services/httpServices/http-invitation.service';
import {InvitationResponse} from '../../../entities/invitationResponse.model';

@Component({
  selector: 'app-invitation-list',
  templateUrl: './invitation-list.component.html',
  styleUrls: ['./invitation-list.component.css']
})
export class InvitationListComponent implements OnInit {
  pendingInvitations: InvitationResponse[];
  constructor(public dataService: DataService, public httpInvitationService: HttpInvitationService) { }

  ngOnInit(): void {
      this.httpInvitationService.loadInvitationsByUserId(this.dataService.userId).subscribe({
        next: invitations => {
          this.pendingInvitations = invitations;
        },
        error: error => {
          this.dataService.handleError(error);
        }
      });
  }

}
