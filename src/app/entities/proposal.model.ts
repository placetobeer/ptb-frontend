import {ActivityType} from "./activityType.enum";

export class Proposal {
  name: string;
  groupId: number;
  activityType: ActivityType;

  constructor(name: string, id: number, activityType: ActivityType) {
    this.name = name;
    this.groupId = id;
    this.activityType = activityType;
  }
}
