import {User} from './user.model';

export interface UserMembership {
  user: User;
  role: string;
}
