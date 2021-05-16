import { Injectable } from '@angular/core';
import {PopupComponent} from './abstract-popup/popup.component';
import {BehaviorSubject} from "rxjs";
import {Group} from "../entities/group.model";
import {BasePopupComponent} from "./base-popup/base-popup.component";
import {Route, Router} from "@angular/router";
import {GroupService} from "../services/group.service";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private popupList: PopupComponent[] = [];

  constructor() { }

  add(popup: PopupComponent): void {
    this.popupList.push(popup);
  }

  remove(id: string): void{
    this.popupList = this.popupList.filter(item => item.id !== id);
  }

  open(id: string): void{
    const popup = this.popupList.find(item => item.id === id);
    popup.open();
  }

  close(id: string): void {
    const popup = this.popupList.find(item => item.id === id);
    popup.close();
  }
}
