import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RoutingService} from "../../services/routing.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;

  constructor(private authService: AuthService, private routingService: RoutingService, private router: Router) { }

  ngOnInit(): void {
  }

  onRegister(): void{
    this.authService.authenticate(11, this.subForm.value.email, this.subForm.value.name, "", 12000);
    this.subForm.reset();
    this.routingService.navigateToHubpage();
    // TODO: implement register functionality
  }
  onCancel(): void{
    this.subForm.reset();
    this.router.navigate(['/login']);
    // TODO: implement cancel functionality
  }
}
