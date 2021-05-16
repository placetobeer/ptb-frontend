import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupService} from '../popup.service';
import {ActivatedRoute, Params, UrlSegment} from "@angular/router";
import {GroupService} from "../../services/group.service";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy {
  id;
  private readonly element;
  subscription;

  constructor(private popupService: PopupService, private elementReference: ElementRef, private route: ActivatedRoute) {
    this.element = elementReference.nativeElement;
  }

  ngOnInit(): void {
    this.subscription = this.route.url.subscribe(
        url => {
          if (url.toString() === 'new') {
            this.id = 'create-group';
            this.openPopup();
          }
          console.log(url.toString());
        }
      );

    if (!this.id){
      console.log('ERROR: popup has no id');
    }

    this.movePopupToBottomOfPage();

    this.popupService.add(this);
  }

  ngOnDestroy(): void {
    this.popupService.remove(this.id);
    this.element.remove();
    this.subscription.unsubscribe();
  }

  openPopup(): void {
    this.popupService.add(this);
    this.popupService.open(this.id);
  }

  open(): void{
    this.element.style.display = 'block';
    document.body.classList.add('abstract-popup-open');
  }

  close(): void{
    this.element.style.display = 'none';
    document.body.classList.remove('abstract-popup-open');
  }

  private movePopupToBottomOfPage(): any{
    document.body.appendChild(this.element);
  }
}
