import {CurrentGroupState} from "./currentGroupState.interface";

export class CurrentGroupSelector {
  private currentGroupState: CurrentGroupState;

  setState(state: boolean): void {
    this.currentGroupState.groupSelected = state;
  }
}
