import {IBudget} from "../../../models/IBudget";
import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {
  AddBudget,
  ClearUserBudgets,
  GetAllUserBudgets, UpdateBudget,
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

  @Action(AddBudget)
  addBudget( {patchState, getState}: StateContext<BudgetStateModel>, {payload}: AddBudget ){
    const state = getState();

    payload.id = this.apiService.generateBudgetId();

    const newBudgetList = [...state.budgets, payload]

    this.apiService.addBudget(newBudgetList, state.currentBudget);

    this.store.dispatch(new UpdateUserBudgets(newBudgetList));
  }

  @Action(UpdateBudget)
  updateBudget({patchState, getState}: StateContext<BudgetStateModel>, {payload}: UpdateBudget){
    const budgetIndex = getState()?.budgets?.findIndex( budget =>  budget.id === payload.id);

    if(budgetIndex >= 0){
      const updatedBudgetList = getState().budgets;
      updatedBudgetList[budgetIndex] = payload;
      this.apiService.updateBudgetList(getState().currentBudget, updatedBudgetList)
    }

  }
  constructor(private apiService: ApiService, private store: Store) {
  }
}
