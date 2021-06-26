import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  message = 'Something went wrong';

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      (params) => {
        if (params.message !== null){
          this.message = params.message;
        }
      }
    );
  }

}
