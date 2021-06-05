import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {PopoverDirective} from "./popover.directive";
import {PopoverItem} from "./popover-item";
import {PopoverInterface} from "./popover.interface";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
})
export class PopoverComponent implements OnInit{
  @Input() popover: PopoverItem;
  @ViewChild(PopoverDirective, {static: true}) popupHost!: PopoverDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    if (this.popover !== undefined) {
      this.loadComponent();
    }
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.popover.component);

    const viewContainerRef = this.popupHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<PopoverInterface>(componentFactory);
    componentRef.instance.data = this.popover.data;
  }

}
