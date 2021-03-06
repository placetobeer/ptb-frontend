import {Component, ElementRef, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PopupService} from '../../../core/services/popup.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() id;
  private readonly element;

  constructor(private popupService: PopupService, private elementReference: ElementRef) {
    this.element = elementReference.nativeElement;
  }

  ngOnInit(): void {
    if (!this.id){
      console.log('ERROR: popup has no id');
    }

    this.movePopupToBottomOfPage();

    this.popupService.add(this);
  }

  ngOnDestroy(): void {
    this.popupService.remove(this.id);
    this.element.remove();
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
