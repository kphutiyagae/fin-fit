import {inject, Injectable} from '@angular/core';

import {
  Firestore,
  collection,
  doc,
  collectionData,
  docData,
  addDoc,
  deleteDoc,
  updateDoc, query, where
} from "@angular/fire/firestore";
import {HttpClient} from "@angular/common/http";
import {from, Observable, of, switchMap, tap} from "rxjs";
import {ITransactionType} from "../../models/ITransactionType";
import {IBudget} from "../../models/IBudget";
import {IUser} from "../../models/IUser";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  firestore: Firestore = inject(Firestore);

  createNewUserData(user: IUser){
    const budgetCollection = collection(this.firestore, 'budgets');
    return from(addDoc(budgetCollection, user)).pipe(
      tap(console.log),
      switchMap( reference => of(reference.id))
    )
  }

  addBudget(budget: IBudget){}

  updateBudget(){}

  getBudgetsByUserId(uid: string){
    const tripCollection = collection(this.firestore, 'budgets');
    const queryRef = query(tripCollection, where('uid','==',`${uid}`))
    return collectionData(queryRef) as Observable<IBudget[]>;
  }

  getAllTransactionTypes(){
    const tripReference = collection(this.firestore, `transaction-types`);
    return collectionData(tripReference) as Observable<ITransactionType[]>;
  }
  constructor(private httpClient: HttpClient) { }
}
