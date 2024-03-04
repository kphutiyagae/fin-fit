import {IBudget} from "../../../models/IBudget";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {ClearUserBudgets, GetAllUserBudgets, UpdateCurrentBudget, UpdateUserBudgets} from "../actions/BudgetActions";
import {ApiService} from "../../../services/api/api.service";
import {map, switchMap, take, tap} from "rxjs";
import {Injectable} from "@angular/core";

export class BudgetStateModel {
  currentBudget!: string;
  budgets: IBudget[] | undefined;
}

@State<BudgetStateModel>({
  name: 'budget',
  defaults: {
    currentBudget: '',
    budgets: []
  }
})

@Injectable()
export class BudgetState {
  @Selector()
  static getBudgets(state: BudgetStateModel){
    return state.budgets;
  }

  @Selector()
  static getCurrentBudget(state: BudgetStateModel){
    return state.currentBudget;
  }

  @Action(GetAllUserBudgets)
  getAllUserBudgets({payload}: GetAllUserBudgets){
    const userBudgets$ = this.apiService.getBudgetsByUserId('test');

    userBudgets$.pipe(
      tap(console.log),
      take(1),
      map( userBudgets => {
        this.store.dispatch(new UpdateUserBudgets(userBudgets))
      })
    ).subscribe()

  }

  @Action(UpdateUserBudgets)
  updateUserBudgets({patchState}: StateContext<BudgetStateModel>, {payload}: UpdateUserBudgets){
    patchState({
      budgets: payload
    })
  }

  @Action(UpdateCurrentBudget)
  updateCurrentBudget({patchState}: StateContext<BudgetStateModel>, {payload}: UpdateCurrentBudget){
    patchState({
      currentBudget: payload
    })
  }

  @Action(ClearUserBudgets)
  clearUserBudgets({patchState}: StateContext<BudgetStateModel>){
    patchState({
      currentBudget: '',
      budgets: undefined
    })
  }

  constructor(private apiService: ApiService, private store: Store) {
  }
}
