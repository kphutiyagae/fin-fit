import {ITransactionType} from "./ITransactionType";

export interface ITransaction {
  id: string;
  title: string;
  category: ITransactionType;
  amount: number;
  date: string;
}
