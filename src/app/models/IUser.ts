import {IBudget} from "./IBudget";

export interface IUser {
  uid: string;
  username: string;
  budgets: IBudget[];
  currentTotalExpenses ?: number;
  currentLimit ?: number;
}
