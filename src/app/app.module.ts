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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HubpageComponent,
    PlaceholderComponent,
    GroupNavigationBarComponent,
    GroupListComponent,
    GroupItemComponent,
    GroupItemActiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
