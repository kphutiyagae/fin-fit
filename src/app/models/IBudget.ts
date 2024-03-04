import {ITransaction} from "./ITransaction";


export interface IBudget {
  id: string;
  title: string;
  totalExpense: number;
  budgetLimit: number;
  transactions?: ITransaction[];
  dateStart?: string;
  dateEnd?:string;
}
