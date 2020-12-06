import {Component, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-hubpage',
  templateUrl: './hubpage.component.html',
  styleUrls: ['./hubpage.component.css']
})
export class HubpageComponent implements OnInit {

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }

}
