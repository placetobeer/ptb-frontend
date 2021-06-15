import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, interval, Subscription} from "rxjs";
import {startWith} from "rxjs/operators";
import {Proposal} from "../entities/proposal.model";
import {ErrorService} from "./error.service";
import {AccountService} from "./account.service";
import {HttpProposalService} from "./httpServices/http-proposal.service";
import {Group} from "../entities/group.model";

@Injectable({
  providedIn: 'root'
})
export class ProposalService implements OnDestroy {

  private subscriptions: Subscription[] = [];

  constructor(private errorService: ErrorService, private accountService: AccountService,
              private httpProposalService: HttpProposalService) {
    this.loadProposals();
  }

  private readonly autoRefreshSubscription =  interval(30000).pipe(startWith(0)).subscribe(() => {
    this.loadProposals();
  });

  private readonly proposalListSubject = new BehaviorSubject<Proposal[]>([]);
  public readonly proposalList$ = this.proposalListSubject.asObservable();

  get proposals(): Proposal[] {
    return this.proposalListSubject.value;
  }

  addProposal(proposal: Proposal): void{
    this.proposalListSubject.next([
      ...this.proposals,
      proposal
    ]);
  }

  private loadProposals(): void {
    const subscription = this.httpProposalService.loadProposalsByUserId(this.accountService.user.id).subscribe({
      next: proposals => {
        this.proposalListSubject.next(proposals);
      },
      error: error => {
        this.errorService.handleError(error);
      }
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.autoRefreshSubscription.unsubscribe();
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
