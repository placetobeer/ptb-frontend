import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-proposal-area',
  templateUrl: './proposal-area.component.html'
})
export class ProposalAreaComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onAddProposal(): void {
    this.router.navigate(['addProposal'], {relativeTo: this.route});
  }
}
