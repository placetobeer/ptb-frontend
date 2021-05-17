import {CurrentGroupSelector} from "./currentGroupSelector.context";
import {ActivatedRoute} from "@angular/router";

export interface CurrentGroupState {
  groupSelected: boolean;

  selectGroup(wrapper: CurrentGroupSelector): void;
}

