import {CurrentGroupState} from "./currentGroupState.interface";
import {CurrentGroupSelector} from "./currentGroupSelector.context";


export class CurrentGroupEmpty implements CurrentGroupState {
  groupSelected: boolean;

  selectGroup(wrapper: CurrentGroupSelector): void {
    wrapper.setState(false);
  }


}
