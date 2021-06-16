import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  onRegister(): void{
    // TODO: implement register functionality
  }
  onCancel(): void{
    // TODO: implement cancel functionality
  }
}
