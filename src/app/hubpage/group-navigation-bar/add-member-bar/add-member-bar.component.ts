import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Invitation} from '../../../requests/invitation-request.model';
import {User} from '../../../entities/user.model';
import {InvitationService} from '../../../services/invitation.service';

@Component({
  selector: 'app-add-member-bar',
  templateUrl: './add-member-bar.component.html',
  styleUrls: ['./add-member-bar.component.css']
})
export class AddMemberBarComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;

  // TODO: replace Mock
  owner = new User(22, 'Hugo Boss');
  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
  }

  onAddMember(): void {
    const newInvitation = new Invitation(0, this.owner, this.subForm.value.email, this.subForm.value.grantAdminRole);
    this.invitationService.addInvitation(newInvitation);
  }
}
