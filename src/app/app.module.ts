import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { HubpageComponent } from './views/hubpage/hubpage.component';
import { PlaceholderComponent } from './shared/placeholder/placeholder.component';
import { GroupNavigationBarComponent } from './shared/group/group-navigation-bar/group-navigation-bar.component';
import { GroupListComponent } from './shared/group/group-list/group-list.component';
import { GroupItemComponent } from './shared/group/group-list/group-item/group-item.component';
import { GroupItemActiveComponent } from './shared/group/group-list/group-item-active/group-item-active.component';
import {CommonModule} from '@angular/common';
import { GroupItemActiveUserItemComponent } from './shared/group/group-list/group-item-active-user-item/group-item-active-user-item.component';
import { PopupComponent } from './views/popups/abstract-popup/popup.component';
import { BasePopupComponent } from './views/popups/base-popup/base-popup.component';
import { BasePopupHeaderComponent } from './views/popups/base-popup/base-popup-header/base-popup-header.component';
import { GroupEditPopupComponent } from './views/popups/routing-popups/group-edit-popup/group-edit-popup.component';
import { CreateGroupPopupComponent } from './views/popups/routing-popups/create-group-popup/create-group-popup.component';
import {FormsModule} from '@angular/forms';
import { GenericErrorPopupComponent } from './views/popups/generic-popups/generic-error-popup/generic-error-popup.component';
import {InvitationListComponent} from './shared/invitation/invitation-list/invitation-list.component';
import {InvitationItemComponent} from './shared/invitation/invitation-list/invitation-item/invitation-item.component';
import { MemberItemComponent } from './shared/group/member-list/member-item/member-item.component';
import { MemberListComponent } from './shared/group/member-list/member-list.component';
import { AddMemberBarComponent } from './shared/group/add-member-bar/add-member-bar.component';
import { ErrorPageComponent } from './views/error-page/error-page.component';
import {AppRoutingModule} from './app-routing.module';
import {GenericConfirmationPopupComponent} from './views/popups/generic-popups/generic-confirmation-popup/generic-confirmation-popup.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RoutingPopupComponent } from './views/popups/routing-popup/routing-popup.component';
import { PopoverComponent } from './shared/popover/popover.component';
import { PopoverDirective } from './shared/popover/popover.directive';
import { OwnerPopoverComponent } from './shared/popover/owner-popover/owner-popover.component';
import { AdminPopoverComponent } from './shared/popover/admin-popover/admin-popover.component';
import { ProposalAreaComponent } from './shared/proposal/proposal-area/proposal-area.component';
import { ProposalListComponent } from './shared/proposal/proposal-list/proposal-list.component';
import { ProposalItemComponent } from './shared/proposal/proposal-list/proposal-item/proposal-item.component';
import { AddProposalPopupComponent } from './views/popups/routing-popups/add-proposal-popup/add-proposal-popup.component';
import { StartpageComponent } from './views/startpage/startpage.component';
import { InfoPopupComponent } from './views/popups/routing-popups/info-popup/info-popup.component';
import { InvitationPopoverComponent } from './shared/popover/invitation-popover/invitation-popover.component';
import { GroupInvitationListComponent } from './shared/group/group-invitation-list/group-invitation-list.component';
import { GroupInvitationItemComponent } from './shared/group/group-invitation-list/group-invitation-item/group-invitation-item.component';
import { AddMemberPopoverComponent } from './shared/popover/add-member-popover/add-member-popover.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HubpageComponent,
    PlaceholderComponent,
    GroupNavigationBarComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupItemActiveComponent,
    GroupItemActiveUserItemComponent,
    PopupComponent,
    BasePopupComponent,
    BasePopupHeaderComponent,
    GroupEditPopupComponent,
    CreateGroupPopupComponent,
    GenericErrorPopupComponent,
    InvitationListComponent,
    InvitationItemComponent,
    MemberItemComponent,
    MemberListComponent,
    AddMemberBarComponent,
    ErrorPageComponent,
    GenericConfirmationPopupComponent,
    RoutingPopupComponent,
    PopoverComponent,
    PopoverDirective,
    OwnerPopoverComponent,
    AdminPopoverComponent,
    ProposalAreaComponent,
    ProposalListComponent,
    ProposalItemComponent,
    AddProposalPopupComponent,
    StartpageComponent,
    InfoPopupComponent,
    InvitationPopoverComponent,
    GroupInvitationListComponent,
    GroupInvitationItemComponent,
    RegisterComponent,
    LoginComponent,
    AddMemberPopoverComponent
  ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        CommonModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
