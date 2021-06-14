import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
})
export class InfoPopupComponent implements OnInit {
  navigateToStartpage;

  constructor() { }

  ngOnInit(): void {
    this.navigateToStartpage = true;
  }

}
