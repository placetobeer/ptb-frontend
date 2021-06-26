import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {RoutingService} from "../../core/services/routing.service";
import {GroupService} from "../../core/services/group.service";

@Component({
  selector: 'app-auth',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('subForm', {static: false}) subForm: NgForm;

  constructor(private route: ActivatedRoute, private router: Router,
              private authService: AuthService, private routingService: RoutingService,
              private groupService: GroupService) { }

  ngOnInit(): void {
  }


  onLogin(): void {
    this.authService.authenticate(4, this.subForm.value.email, "Patrick", "", 12000);
    this.subForm.reset();
    this.groupService.loadUserGroups();
    this.routingService.navigateToHubpage();
  }

  onCancel(): void {
    this.subForm.reset();
    this.router.navigate(['']);
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}
