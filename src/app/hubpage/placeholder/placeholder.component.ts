import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import {PopupService} from '../../popups/popup.service';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.css']
})
export class PlaceholderComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
}
