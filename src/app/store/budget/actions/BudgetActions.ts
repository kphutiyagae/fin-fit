import {IBudget} from "../../../models/IBudget";
import {IBudgetDTO} from "../../../models/dto/IBudgetDTO";

export class GetAllUserBudgets{
  static readonly type = '[BUDGET] Get Budgets List';
  constructor(public payload: string) {
  }
}

export class UpdateUserBudgets{
  static readonly type = '[BUDGET] Update Budgets List';
  constructor(public payload: IBudget[]) {
  }
}

export class AddBudget{
  static readonly type = '[BUDGET] Add Budget';
  constructor(public payload: IBudget) {
  }
}

export class UpdateBudget{
  static readonly type = '[BUDGET] Update Budget';
  constructor(public payload: IBudget) {
  }
}

export class UpdateCurrentBudget{
  static readonly type = '[BUDGET] Update Current Budget';
  constructor(public payload: string) {
  }
}

export class UpdateTotalExpenses{
  static readonly type = '[BUDGET] Update Total Expenses';
  constructor(public payload: number) {
  }
}

export class UpdateExpenseLimit{
  static readonly type = '[BUDGET] Update Expense Limit';
  constructor(public payload: number) {
  }
}

export class ClearUserBudgets{
  static readonly type = '[BUDGET] Clear Budgets';
  constructor() {
  }
}
