import { Type } from '@angular/core';
import {GroupsMembership} from "../../core/model/entities/groupsMembership.model";

export class PopoverItem {
  constructor(public component: Type<any>, public data: any) {}
}
