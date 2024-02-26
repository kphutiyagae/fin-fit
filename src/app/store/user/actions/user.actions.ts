import {User} from "../../../models/user.model";

export class AddUser {
  static readonly type = '[AUTH] Add User';

  constructor(public payload: User) {
  }
}

export class RemoveUser {
  static readonly type = '[AUTH] Remove User';

  constructor() {
  }
}

