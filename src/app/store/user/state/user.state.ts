import {State, Action, StateContext, Selector} from '@ngxs/store';
import { User } from "../../../models/user.model";
import {AddUser, RemoveUser} from "../actions/user.actions";

export class UserStateModel {
  user: User | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined
  }
})

export class UserState {
  @Selector()
  static getLoggedInUser(state: UserStateModel){
      return state.user;
  }

  @Action(AddUser)
  addUser({getState, patchState}: StateContext<UserStateModel>, { payload }: AddUser){
    const state = getState();
    if(!state.user){
      patchState({
        user: payload
      })
    }
  }
  @Action(RemoveUser)
  removeUser({getState, patchState}: StateContext<UserStateModel> ){
    const state = getState();
    if(state.user){
      patchState({
        user: undefined
      })
    }
  }
}
