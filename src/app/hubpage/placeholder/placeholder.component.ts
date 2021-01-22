import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {PopupService} from '../../popups/popup.service';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {

  constructor(public dataService: DataService, private popupService: PopupService) { }

  ngOnInit(): void {
  }

  openPopup(): any {
    this.popupService.open('placeholder-popup');
  }

  closePopup(): any {
    this.popupService.close('placeholder-popup');
  }
}
