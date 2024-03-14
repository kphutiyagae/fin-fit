import {Component, OnInit, ViewChild} from '@angular/core';
import {concat, filter, last, map, merge, Observable, switchMap, take, tap} from "rxjs";
import {IBudget} from "../../models/IBudget";
import {Store} from "@ngxs/store";
import {ActivatedRoute, Router, UrlSegment} from "@angular/router";
import {BudgetState} from "../../store/budget/state/BudgetState";
import {dateToTimestamp, getRemainingDays, timestampToUTC} from "../../utils/utils";
import {IonModal} from "@ionic/angular";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {formatDate} from "@angular/common";
import {UpdateBudget, UpdateCurrentBudget} from "../../store/budget/actions/BudgetActions";
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
  public currentBudgetId: string = '';

  navigateToHome(){
    this.router.navigate([`/`]);
  }

  cancelEditBudget(){
    this.editBudgetModal?.dismiss(null, 'cancel');
  }

  submitEditBudget(){

    const startDate = dateToTimestamp(this?.editBudgetForm?.controls['budgetDateStart'].value);
    const endDate = dateToTimestamp(this?.editBudgetForm?.controls['budgetDateEnd'].value)

    const editedBudget: IBudget = {
      title: this?.editBudgetForm?.controls['budgetTitle'].value,
      budgetLimit: this?.editBudgetForm?.controls['budgetLimit'].value,
      dateStart: startDate,
      dateEnd: endDate,
      totalExpense: this?.editBudgetForm?.controls['budgetExpenses'].value,
      transactions: this?.editBudgetForm?.controls['budgetTransactions'].value,
      id: this.currentBudgetId
    }

    this.store.dispatch(new UpdateBudget(editedBudget))
  }

  constructor(private store: Store, private route: ActivatedRoute, private router: Router) {
    this.currentBudget$ = this.route.url
      .pipe(
        map( urlSegments => {
          if(urlSegments.at(1)) {
            const currentBudgetId = urlSegments?.at(1)?.toString() ?? '';
            this.store.dispatch(new UpdateCurrentBudget(currentBudgetId));
            return currentBudgetId;
          }
          return urlSegments?.at(0)?.toString() ?? '';
        }),
        switchMap(budgetId => {
           return this.store.select(BudgetState.getBudgets).pipe(
             map(budgetList => {
               const budget = budgetList.find(budget => budget.id === budgetId);

               if(budget){
                 this.editBudgetForm = new FormGroup({
                   budgetTitle: new FormControl(budget.title, [Validators.required, Validators.minLength(1)]),
                   budgetExpenses: new FormControl(budget.totalExpense, [Validators.required, Validators.min(0)]),
                   budgetLimit: new FormControl(0, [Validators.min(0), Validators.required]),
                   budgetDateStart: new FormControl( timestampToUTC(budget?.dateStart ?? '') , [Validators.required]),
                   budgetDateEnd: new FormControl( timestampToUTC(budget?.dateEnd ?? '') ),
                   budgetTransactions: new FormControl(budget.transactions)
                 })

               }

               return budget;
             })
           )
        }),
      )

    this.addNewTransactionForm = new FormGroup({
      transactionTitle: new FormControl('', [Validators.required, Validators.minLength(1)]),
      transactionAmount: new FormControl(0),
      transactionDate: new FormControl('', [Validators.required]),
      transactionCategory: new FormControl('', [Validators.required])
    });

    this.store.select(BudgetState.getCurrentBudget)
      .pipe(
        last(),
        map( id => this.currentBudgetId = id)
      ).subscribe()
  }

}
