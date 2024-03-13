import {Component, OnInit, ViewChild} from '@angular/core';
import {concat, filter, map, merge, Observable, switchMap, tap} from "rxjs";
import {IBudget} from "../../models/IBudget";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {BudgetState} from "../../store/budget/state/BudgetState";
import {getRemainingDays} from "../../utils/utils";
import {IonModal} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  currentBudget$: Observable<IBudget | undefined>;

  calculateRemainingDays = getRemainingDays;

  @ViewChild(IonModal) addTransactionModal!: IonModal;
  @ViewChild(IonModal) editBudgetModal!: IonModal;

  public addNewTransactionForm: FormGroup;
  public editBudgetForm!: FormGroup;

  navigateToHome(){
    this.router.navigate([`/`]);
  }

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.currentBudget$ = this.route.url
      .pipe(
        map( urlSegments => {
          if(urlSegments.at(1)) return urlSegments?.at(1)?.toString() ?? '';
          return urlSegments?.at(0)?.toString() ?? '';
        }),
        switchMap(budgetId => {
           return this.store.select(BudgetState.getBudgets).pipe(
             map(budgetList => {
               const budget = budgetList.find(budget => budget.id === budgetId);

               if(budget){
                 this.editBudgetForm = new FormGroup({
                   budgetTitle: new FormControl(budget.title, [Validators.required, Validators.minLength(1)]),
                   budgetTotalExpense: new FormControl(budget.totalExpense, [Validators.required, Validators.min(0)]),
                   budgetDateStart: new FormControl(budget.dateStart, [Validators.required]),
                   budgetEndDate: new FormControl(budget.dateEnd),
                   budgetTransactions: new FormControl(budget.transactions)
                 })
               }

               return budget;
             })
           )
        }),
        tap(console.log)
      )

    this.addNewTransactionForm = new FormGroup({
      transactionTitle: new FormControl('', [Validators.required, Validators.minLength(1)]),
      transactionAmount: new FormControl(0),
      transactionDate: new FormControl('', [Validators.required]),
      transactionCategory: new FormControl('', [Validators.required])
    });
  }

}
