import {CurrentGroupSelector} from "./currentGroupSelector.context";

export interface CurrentGroupState {
  groupSelected: boolean;

  selectGroup(wrapper: CurrentGroupSelector): void;
}

