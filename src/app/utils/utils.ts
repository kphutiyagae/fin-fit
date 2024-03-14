import {IBudget} from "../models/IBudget";

export function calculateTotalExpense(budgetList: IBudget[]): number{
  var totalExpenses = 0;

  if(budgetList){
    totalExpenses = budgetList.reduce(((accumulator, currentValue) => accumulator + currentValue.totalExpense), 0);
  }

  return totalExpenses;
}


export function getRemainingDays(startDate: string, endDate:string){

  if(startDate.length !== 0 && endDate.length !== 0){
    const startUTCDate = new Date(Number(startDate) * 1000);
    const endUTCDate = new Date( Number(endDate) * 1000);
    const dateDifference = Date.UTC(endUTCDate.getFullYear(), endUTCDate.getMonth(), endUTCDate.getDate()) - Date.UTC(startUTCDate.getFullYear(), startUTCDate.getMonth(), startUTCDate.getDate())
    return dateDifference / (1000 * 60 * 60 * 24);
  }

  return 0;
}

export function timestampToUTC(timestamp: string){
  if(timestamp.length !== 0){
    const dateString = Number(timestamp) * 1000;
    const timestampString =  Date.parse(dateString.toString());

    console.log(timestampString);

    return timestampString
  }
  return  '';
}

export function dateToTimestamp(dateString: string) {
  if(dateString.length !== 0){
    const parsedDate = Date.parse(dateString);
    return (parsedDate * 1000).toString();
  }

  return '';

}
