import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {DataService} from '../../../services/data.service';
import {NgForm} from '@angular/forms';
import {Invitation} from '../../../requests/invitation-request.model';
import {User} from '../../../entities/user.model';
import {InvitationService} from '../../../services/invitation.service';
import {GroupRole} from '../../../entities/groupRole.enum';

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  id = 'create-group';
  invitations: Invitation[];
  eRole = GroupRole;
  // TODO: replace Mock
  ownerId = this.dataService.userId;
  owner: User = new User(this.ownerId, 'Hugo Boss');

  constructor(private popupService: PopupService, private dataService: DataService, public invitationService: InvitationService) { }

  ngOnInit(): void {
    this.invitationService.invitationChanged.subscribe(
      (invitations: Invitation[]) => {
        this.invitations = invitations;
      }
    );
  }

  onSubmit(): void {
    this.dataService.createGroup(this.ownerId, this.form.value.groupName);
    this.form.reset();
    this.popupService.close(this.id);
  }

  onCancel(): void {
    this.form.reset();
    this.popupService.close(this.id);
  }

  onAddMember(): void {
    const value = this.form.value;
    const newInvitation = new Invitation(null, value.email, this.eRole.MEMBER);
    this.invitationService.addInvitation(newInvitation);
  }
}
