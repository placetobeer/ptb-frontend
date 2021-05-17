import {CurrentGroupState} from "./currentGroupState.interface";
import {Group} from "../entities/group.model";
import {BehaviorSubject} from "rxjs";
import {GroupService} from "../services/group.service";
import {CurrentGroupSelector} from "./currentGroupSelector.context";
import {ActivatedRoute} from "@angular/router";

export class CurrentGroupEmpty implements CurrentGroupState {
  groupSelected: boolean;

  selectGroup(wrapper: CurrentGroupSelector): void {
    wrapper.setState(false);
  }


}
