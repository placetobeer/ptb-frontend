import {Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {PopoverDirective} from "./popover.directive";
import {PopoverItem} from "./popover-item";
import {PopoverInterface} from "./popover.interface";

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
})
export class PopoverComponent implements OnInit, OnChanges{
  @Input() popover: PopoverItem;
  @ViewChild(PopoverDirective, {static: true}) popupHost!: PopoverDirective;
  componentRef: ComponentRef<PopoverInterface>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.popover !== undefined) {
      this.loadComponent();
    }
  }

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.popover.component);

    const viewContainerRef = this.popupHost.viewContainerRef;
    viewContainerRef.clear();

    this.componentRef = viewContainerRef.createComponent<PopoverInterface>(componentFactory);
    this.componentRef.instance.data = this.popover.data;

    const component = this.componentRef.instance;
    component.popoverComponentRef = this;
  }

  removeComponent(): void {
    const viewContainerRef = this.popupHost.viewContainerRef;
    if (viewContainerRef.length < 1) {return; }

    viewContainerRef.remove();
  }
}
