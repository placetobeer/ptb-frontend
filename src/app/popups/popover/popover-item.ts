import { Type } from '@angular/core';

export class PopoverItem {
  constructor(public id: number, public component: Type<any>, public data: any) {}
}
