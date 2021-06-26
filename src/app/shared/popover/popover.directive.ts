import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPopupDirective]',
})
export class PopoverDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
  }
}
