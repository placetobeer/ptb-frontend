import {CurrentGroupState} from "./currentGroupState.interface";
import {CurrentGroupSelector} from "./currentGroupSelector.context";


export class CurrentGroupEmpty implements CurrentGroupState {
  constructor(private wrapper: CurrentGroupSelector) {}

  setSelectorState(): void {
    this.wrapper.setState(false);
  }
}
