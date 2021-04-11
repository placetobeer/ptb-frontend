import {AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import {Group} from '../../../../../entities/group.model';
import {PopupService} from '../../../../../popups/popup.service';

@Component({
  selector: 'app-group-edit-popup',
  templateUrl: './group-edit-popup.component.html',
  styleUrls: ['./group-edit-popup.component.css']
})
export class GroupEditPopupComponent implements OnInit {
  @ViewChild('groupForm') form: NgForm;
  @Input() group: Group;

  id = 'group-edit';
  initialValues;

  buttonMap: Map<string, string> = new Map<string, string>([
    ['Cancel', 'cancel'],
    ['Apply', 'apply']
  ]);

  constructor(private popupService: PopupService, private dataService: DataService) { }

  ngOnInit(): void {
    this.initialValues = {
      groupName : this.dataService.selectedGroup.name
    };
  }

  onButtonClick(buttonName: string): void {
    console.log(buttonName);
    switch (buttonName){
      case 'cancel':
        this.closePopup();
        break;
      case 'apply':
        this.applyGroupChanges();
        this.closePopup();
        break;
    }
  }

  private applyGroupChanges(): void {
    if (this.form.untouched || !this.form.valid){
      return;
    }
    this.changeGroupName();
  }

  private changeGroupName(): void {
    const groupNameInput = this.form.controls.groupName;
    if (groupNameInput.untouched || !groupNameInput.valid){
      return;
    }
    this.dataService.setActiveGroupName(groupNameInput.value);
  }

  private closePopup(): void {
    this.resetValues();
    this.popupService.close(this.id);
  }

  private resetValues(): void {
    this.form.reset();
    this.form.controls.groupName.setValue( this.initialValues.groupName);
  }

  onSubmit(): void {
    this.applyGroupChanges();
    this.closePopup();
  }

  onCancel(): void {
    this.closePopup();
  }
}
