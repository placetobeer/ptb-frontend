import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }


  onLogin(): void {
    // TODO: add functionality wen Login button pressed
  }

  onCancel(): void {
    // TODO: resetForm()
  }

  onRegister(): void {
    this.router.navigate(['/register']);
    // TODO: route to /register - register.component
  }
}