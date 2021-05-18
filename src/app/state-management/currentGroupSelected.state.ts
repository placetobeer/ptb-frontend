import {CurrentGroupSelector} from "./currentGroupSelector.context";
import {CurrentGroupState} from "./currentGroupState.interface";

export class CurrentGroupSelected implements CurrentGroupState {
  groupSelected: boolean;

  selectGroup(wrapper: CurrentGroupSelector): void {
    wrapper.setState(true);
  }
}
