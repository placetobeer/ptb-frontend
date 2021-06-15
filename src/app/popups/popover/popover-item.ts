import { Type } from '@angular/core';
import {GroupsMembership} from "../../entities/groupsMembership.model";

export class PopoverItem {
  constructor(public component: Type<any>, public data: any) {}
}
