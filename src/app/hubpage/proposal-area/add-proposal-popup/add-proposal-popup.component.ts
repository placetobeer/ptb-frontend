import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RoutingService} from "../../../services/routing.service";
import {ActivityType} from "../../../entities/activityType.enum";
import {Subscription} from "rxjs";
import {HttpProposalService} from "../../../services/httpServices/http-proposal.service";
import {ProposalService} from "../../../services/proposal.service";
import {ErrorService} from "../../../services/error.service";
import {AccountService} from "../../../services/account.service";
import {Proposal} from "../../../entities/proposal.model";
import {Group} from "../../../entities/group.model";
import {GroupService} from "../../../services/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-proposal-popup',
  templateUrl: './add-proposal-popup.component.html'
})
export class AddProposalPopupComponent implements OnDestroy {
  @ViewChild('f', {static: false}) form: NgForm;
  navigateToStartpage = false;
  private subscriptions: Subscription[] = [];
  keys = Object.keys;
  activityTypes = ActivityType;

  constructor(private routingService: RoutingService, private httpProposalService: HttpProposalService,
              private proposalService: ProposalService, private errorService: ErrorService,
              private groupService: GroupService, private router: Router) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSubmit(): void {
    if (this.groupService.currentGroup.id !== null){
      this.createProposal(this.groupService.currentGroup.id, this.form.value.proposalName, this.form.value.activityType);
    }
    this.form.reset();
  }

  onCancel(): void {
    this.form.reset();
    this.routingService.navigateToHubpage();
  }

  private createProposal(currentGroupId: number, proposalName: string, activityType: ActivityType): void {
    const newProposal = new Proposal(proposalName, currentGroupId, activityType);
    const subscription = this.httpProposalService.createProposalByUserId(newProposal)
      .subscribe({
        next: proposal => {
          this.proposalService.addProposal(proposal);
          this.routingService.navigateToHubpage();
        },
        error: error => {
          this.errorService.handleError(error);
        }
      });
    this.subscriptions.push(subscription);
  }
}
