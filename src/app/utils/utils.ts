import {IBudget} from "../models/IBudget";

export function calculateTotalExpense(budgetList: IBudget[]): number{
  var totalExpenses = 0;

  if(budgetList){
    return budgetList.reduce(((accumulator, currentValue) => accumulator + currentValue.totalExpense), 0);
  }

  return totalExpenses;
}
