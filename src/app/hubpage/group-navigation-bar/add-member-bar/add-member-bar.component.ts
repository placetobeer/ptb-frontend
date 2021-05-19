import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../entities/user.model';
import {InvitationService} from '../../../services/invitation.service';
import {Invitation} from '../../../entities/invitation.model';
import {NgForm} from '@angular/forms';
import {AccountService} from "../../../services/account.service";
import {InvitationItemComponent} from "../invitation-list/invitation-item/invitation-item.component";

@Component({
  selector: 'app-add-member-bar',
  templateUrl: './add-member-bar.component.html',
  styleUrls: ['./add-member-bar.component.css']
})
export class AddMemberBarComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;
  errorMessage = 'No valid email address';
  invitationDuplicate;
  owner = this.accountService.user;
  constructor(private invitationService: InvitationService, private accountService: AccountService) { }

  ngOnInit(): void {
  }

  onAddMember(): void {
    const newInvitation = new Invitation(this.subForm.value.email, this.subForm.value.grantAdminRole);
    if (this.invitationService.invitations !== null) {
      // todo find solution to only add an invitation if it is unique -> RXJS function for that?
      this.invitationDuplicate = this.invitationService.invitations.filter(invitation => this.subForm.value.email === invitation.email);
      console.log(this.invitationDuplicate);
    }
    if (this.invitationDuplicate == null) {
      this.invitationService.addInvitation(newInvitation);
      this.subForm.resetForm();
    } else {
      this.errorMessage = 'You have already added this email address';
      this.subForm.resetForm();
      this.subForm.controls.email.markAllAsTouched();
    }
  }
}
