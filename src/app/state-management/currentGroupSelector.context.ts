import {CurrentGroupState} from "./currentGroupState.interface";
import {Group} from "../entities/group.model";

export class CurrentGroupSelector {
  private currentGroupState: CurrentGroupState;

  setState(state: boolean): void {
    this.currentGroupState.groupSelected = state;
  }
}
