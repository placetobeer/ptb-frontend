import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './hubpage/header/header.component';
import { HubpageComponent } from './hubpage/hubpage.component';
import { PlaceholderComponent } from './hubpage/placeholder/placeholder.component';
import { GroupNavigationBarComponent } from './hubpage/group-navigation-bar/group-navigation-bar.component';
import { GroupListComponent } from './hubpage/group-navigation-bar/group-list/group-list.component';
import { GroupItemComponent } from './hubpage/group-navigation-bar/group-list/group-item/group-item.component';
import { GroupItemActiveComponent } from './hubpage/group-navigation-bar/group-list/group-item-active/group-item-active.component';
import {CommonModule} from '@angular/common';
import { GroupItemActiveUserItemComponent } from './hubpage/group-navigation-bar/group-list/group-item-active/group-item-active-user-item/group-item-active-user-item.component';
import { PopupComponent } from './popups/abstract-popup/popup.component';
import { BasePopupComponent } from './popups/base-popup/base-popup.component';
import { BasePopupHeaderComponent } from './popups/base-popup/base-popup-header/base-popup-header.component';
import { GroupEditPopupComponent } from './hubpage/group-navigation-bar/group-list/group-item-active/group-edit-popup/group-edit-popup.component';
import { CreateGroupPopupComponent } from './hubpage/group-navigation-bar/create-group-popup/create-group-popup.component';
import {FormsModule} from '@angular/forms';
import { GenericErrorPopupComponent } from './popups/generic-error-popup/generic-error-popup.component';
// @ts-ignore
import {InvitationListComponent} from './hubpage/group-navigation-bar/invitation-list/invitation-list.component';
// @ts-ignore
import {InvitationItemComponent} from './hubpage/group-navigation-bar/invitation-list/invitation-item/invitation-item.component';
import { MemberItemComponent } from './hubpage/group-navigation-bar/member-list/member-item/member-item.component';
import { MemberListComponent } from './hubpage/group-navigation-bar/member-list/member-list.component';
import { AddMemberBarComponent } from './hubpage/group-navigation-bar/add-member-bar/add-member-bar.component';
import { ErrorPageComponent } from './error/error-page/error-page.component';
import {AppRoutingModule} from './app-routing.module';
import {GenericConfirmationPopupComponent} from './popups/generic-confirmation-popup/generic-confirmation-popup.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

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
    LoginComponent,
    RegisterComponent
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
