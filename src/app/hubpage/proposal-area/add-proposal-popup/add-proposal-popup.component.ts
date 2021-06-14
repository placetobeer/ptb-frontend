import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";

@Component({
  selector: 'app-add-proposal-popup',
  templateUrl: './add-proposal-popup.component.html'
})
export class AddProposalPopupComponent implements OnInit {
  @ViewChild('f', {static: false}) form: NgForm;
  navigateToStartpage = false;

  constructor(private routingService: RoutingService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // post request
  }

  onCancel(): void {
    this.form.reset();
    this.routingService.navigateToHubpage();
  }
}
