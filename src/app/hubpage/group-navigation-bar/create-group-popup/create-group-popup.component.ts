import {Component, OnInit, ViewChild} from '@angular/core';
import {PopupService} from '../../../popups/popup.service';
import {DataService} from '../../../services/data.service';
import {NgForm} from '@angular/forms';
import {Invitation} from '../../../requests/invitation-request.model';
import {InvitationService} from '../../../services/invitation.service';

@Component({
  selector: 'app-create-group-popup',
  templateUrl: './create-group-popup.component.html',
  styleUrls: ['./create-group-popup.component.css']
})
export class CreateGroupPopupComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  id = 'create-group';
  // TODO: replace Mock
  ownerId = this.dataService.userId;

  constructor(private popupService: PopupService, private dataService: DataService, public invitationService: InvitationService) { }

  ngOnInit(): void {
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

}
