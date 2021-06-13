import {Component, ElementRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {GroupService} from "../../services/group.service";
import {InvitationService} from "../../services/invitation.service";
import {RoutingService} from "../../services/routing.service";

@Component({
  selector: 'app-routing-popup',
  templateUrl: './routing-popup.component.html',
  styleUrls: ['./routing-popup.component.css']
})
export class RoutingPopupComponent implements OnInit {
  @Input() navigateToStartpage: boolean;

  constructor(private groupService: GroupService, private invitationService: InvitationService,
              private routingService: RoutingService) {}

  ngOnInit(): void { }

  close(): void{
    this.invitationService.removeAllInvitations();
    if (this.navigateToStartpage){
      this.routingService.navigateToStartpage();
    } else {
      this.routingService.navigateToHubpage();
    }
  }
}
