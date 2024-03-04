import {IBudget} from "./IBudget";

export interface IBudgetStore {
  currentBudget: string;
  budgets: IBudget[];
  totalExpenses: number;
  expenseLimit: number;
}
