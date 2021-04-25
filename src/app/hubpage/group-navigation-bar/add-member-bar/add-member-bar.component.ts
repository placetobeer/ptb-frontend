import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Invitation} from '../../../requests/invitation-request.model';
import {User} from '../../../entities/user.model';
import {InvitationService} from '../../../services/invitation.service';
import {PopupHelperService} from '../../../popups/popup-helper.service';

@Component({
  selector: 'app-add-member-bar',
  templateUrl: './add-member-bar.component.html',
  styleUrls: ['./add-member-bar.component.css']
})
export class AddMemberBarComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;
  errorMessage = 'No valid email address';
  // TODO: replace Mock
  owner = new User(22, 'Hugo Boss');
  constructor(private invitationService: InvitationService) { }

  ngOnInit(): void {
  }

  onAddMember(): void {
    const newInvitation = new Invitation(0, this.owner, this.subForm.value.email, this.subForm.value.grantAdminRole);
    if (this.validateAlreadyAdded()) {
      this.invitationService.addInvitation(newInvitation);
    } else {
      this.errorMessage = 'You have already added this email address';
      this.subForm.reset();
      // TODO make email control touched
    }
  }

  private validateAlreadyAdded(): boolean {
    for (const invitation of this.invitationService.invitations) {
      if (this.subForm.value.email === invitation.email) {
        return false;
      }
    }
    return true;
  }
}
