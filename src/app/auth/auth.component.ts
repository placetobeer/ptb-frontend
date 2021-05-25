import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }


  onLogin(): void {
    // TODO: add functionality wen Login button pressed
  }

  onCancel(): void {
    // TODO: resetForm()
  }

  onRegister(): void {
    // TODO: route to /register - register.component
  }
}
