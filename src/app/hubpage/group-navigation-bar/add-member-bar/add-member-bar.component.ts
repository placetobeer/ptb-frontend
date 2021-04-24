import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Invitation} from '../../../requests/invitation-request.model';
import {User} from '../../../entities/user.model';
import {GroupRole} from '../../../entities/groupRole.enum';
import {InvitationService} from '../../../services/invitation.service';

@Component({
  selector: 'app-add-member-bar',
  templateUrl: './add-member-bar.component.html',
  styleUrls: ['./add-member-bar.component.css']
})
export class AddMemberBarComponent implements OnInit {
  @ViewChild('invitationData', {static: false}) invitationData: NgForm;

  // TODO: replace Mock
  owner: User = new User(22, 'Hugo Boss');
  role = GroupRole;
  grantAdmin = false;
  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
  }

  onAddMember(): void {
    const newInvitation = new Invitation(0, this.owner, this.invitationData.value.email, this.grantAdmin);
    this.invitationService.transferInvitationData(newInvitation);
  }
}
