import {CurrentGroupSelector} from "./currentGroupSelector.context";
import {CurrentGroupState} from "./currentGroupState.interface";
import {BehaviorSubject} from "rxjs";
import {Group} from "../entities/group.model";

export class CurrentGroupSelected implements CurrentGroupState {
  groupSelected: boolean;

  selectGroup(wrapper: CurrentGroupSelector): void {
    wrapper.setState(true);
  }
}
