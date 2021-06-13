import {PopoverComponent} from "./popover.component";
import {GroupsMembership} from "../../entities/groupsMembership.model";

export interface PopoverInterface {
  userMembership: GroupsMembership;
  popoverComponentRef: PopoverComponent;
}
