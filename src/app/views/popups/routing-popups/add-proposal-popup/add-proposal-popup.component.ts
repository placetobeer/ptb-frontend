import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {RoutingService} from "../../../../core/services/routing.service";
import {ActivityType} from "../../../../core/model/entities/activityType.enum";
import {Subscription} from "rxjs";
import {HttpProposalService} from "../../../../core/httpServices/http-proposal.service";
import {ProposalService} from "../../../../core/services/proposal.service";
import {ErrorService} from "../../../../core/services/error.service";
import {AccountService} from "../../../../core/services/account.service";
import {Proposal} from "../../../../core/model/entities/proposal.model";
import {Group} from "../../../../core/model/entities/group.model";
import {GroupService} from "../../../../core/services/group.service";
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
