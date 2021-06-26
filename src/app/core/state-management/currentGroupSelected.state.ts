import {CurrentGroupSelector} from "./currentGroupSelector.context";
import {CurrentGroupState} from "./currentGroupState.interface";

export class CurrentGroupSelected implements CurrentGroupState {
  constructor(private wrapper: CurrentGroupSelector) {}

  setSelectorState(): void {
    this.wrapper.setState(true);
  }
}
