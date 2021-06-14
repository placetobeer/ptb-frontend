import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from './error/error-page/error-page.component';
import {NgModule} from '@angular/core';
import {HubpageComponent} from './hubpage/hubpage.component';
import {CreateGroupPopupComponent} from "./hubpage/group-navigation-bar/create-group-popup/create-group-popup.component";
import {PopupComponent} from "./popups/abstract-popup/popup.component";
import {GroupEditPopupComponent} from "./hubpage/group-navigation-bar/group-list/group-item-active/group-edit-popup/group-edit-popup.component";
import {RoutingPopupComponent} from "./popups/routing-popup/routing-popup.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {StartpageComponent} from "./startpage/startpage.component";
import {InfoPopupComponent} from "./popups/info-popup/info-popup.component";
import {AddProposalPopupComponent} from "./hubpage/proposal-area/add-proposal-popup/add-proposal-popup.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'hubpage', component: HubpageComponent, children: [
      {path: 'new', component: CreateGroupPopupComponent}
    ]},
  {path: 'hubpage/:id', component: HubpageComponent, children: [
      {path: 'edit', component: GroupEditPopupComponent},
      {path: 'addProposal', component: AddProposalPopupComponent}
    ]},
  {path: 'error', component: ErrorPageComponent},
  {path: 'startpage', component: StartpageComponent, children: [
      {path: 'info', component: InfoPopupComponent}
    ]},
  {path: '', redirectTo: '/startpage', pathMatch: 'full'},
  {path: '**', redirectTo: '/error?message=Page+not+found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
