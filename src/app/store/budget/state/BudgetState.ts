import {IBudget} from "../../../models/IBudget";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {
  ClearUserBudgets,
  GetAllUserBudgets,
  UpdateCurrentBudget, UpdateExpenseLimit,
  UpdateTotalExpenses,
  UpdateUserBudgets
} from "../actions/BudgetActions";
import {ApiService} from "../../../services/api/api.service";
import {map, switchMap, take, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {calculateTotalExpense} from "../../../utils/utils";

export class BudgetStateModel {
  currentBudget!: string;
  budgets!: IBudget[];
  totalExpenses!: number;
  expenseLimit!: number;
}

@State<BudgetStateModel>({
  name: 'budget',
  defaults: {
    currentBudget: '',
    budgets: [],
    totalExpenses: 0,
    expenseLimit: 0
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

  @Selector()
  static getAvailableSpend(state: BudgetStateModel){
    return Math.abs(state.expenseLimit - state.totalExpenses);
  }

  @Action(GetAllUserBudgets)
  getAllUserBudgets({payload}: GetAllUserBudgets){
    const userBudgets$ = this.apiService.getBudgetsByUserId('test');

    userBudgets$.pipe(
      take(1),
      map( userBudgets => {
        this.store.dispatch(new UpdateTotalExpenses(calculateTotalExpense(userBudgets)));
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

  @Action(UpdateTotalExpenses)
  updateTotalExpenses( {patchState}: StateContext<BudgetStateModel>, {payload}: UpdateTotalExpenses){
    patchState({
      totalExpenses: payload
    })
  }

  @Action(UpdateExpenseLimit)
  updateExpenseLimit( {patchState}: StateContext<BudgetStateModel>, {payload}: UpdateExpenseLimit){
    patchState({
      expenseLimit: payload
    })
  }

  constructor(private apiService: ApiService, private store: Store) {
  }
}
