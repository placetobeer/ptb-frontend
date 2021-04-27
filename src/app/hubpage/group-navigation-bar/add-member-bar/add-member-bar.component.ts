import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../entities/user.model';
import {InvitationService} from '../../../services/invitation.service';
import {Invitation} from '../../../entities/invitation.model';
import {NgForm} from '@angular/forms';

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
    const newInvitation = new Invitation(this.subForm.value.email, this.subForm.value.grantAdminRole);
    if (this.validateAlreadyAdded()) {
      this.invitationService.addInvitation(newInvitation);
      this.subForm.resetForm();
    } else {
      this.errorMessage = 'You have already added this email address';
      this.subForm.resetForm();
      this.subForm.controls.email.markAllAsTouched();
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
