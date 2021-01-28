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
import { BasePopupButtonBarComponent } from './popups/base-popup/base-popup-button-bar/base-popup-button-bar.component';
import { GroupEditPopupComponent } from './hubpage/group-navigation-bar/group-list/group-item-active/group-edit-popup/group-edit-popup.component';
import { CreateGroupPopupComponent } from './hubpage/group-navigation-bar/create-group-popup/create-group-popup.component';

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
    BasePopupButtonBarComponent,
    GroupEditPopupComponent,
    CreateGroupPopupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
