import {IBudget} from "../../../models/IBudget";

export class GetAllUserBudgets{
  static readonly type = '[BUDGET] Get Budgets';
  constructor(public payload: string) {
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

export class ClearUserBudgets{
  static readonly type = '[BUDGET] Clear Budgets';
  constructor() {
  }
}
