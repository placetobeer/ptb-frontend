import { Component, OnInit } from '@angular/core';
import {ProposalService} from "../../../services/proposal.service";

@Component({
  selector: 'app-proposal-list',
  templateUrl: './proposal-list.component.html'
})
export class ProposalListComponent implements OnInit {

  constructor(public proposalService: ProposalService) { }

  ngOnInit(): void {
    console.log(this.proposalService.proposalList$);
  }

}
