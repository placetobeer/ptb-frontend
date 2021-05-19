import {CurrentGroupState} from "./currentGroupState.interface";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CurrentGroupSelector {
  private currentGroupState: CurrentGroupState;

  setState(state: boolean): void {
    this.currentGroupState.setSelectorState(state);
  }
}
