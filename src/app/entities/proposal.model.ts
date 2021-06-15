import {ActivityType} from "./activityType.enum";

export class Proposal {
  id: number;
  name: string;
  activityType: ActivityType;

  constructor(id: number, name: string, activityType: ActivityType) {
    this.id = id;
    this.name = name;
    this.activityType = activityType;
  }
}
