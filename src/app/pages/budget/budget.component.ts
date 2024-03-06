import {Component, OnInit} from '@angular/core';
import {concat, filter, map, merge, Observable, switchMap, tap} from "rxjs";
import {IBudget} from "../../models/IBudget";
import {Store} from "@ngxs/store";
import {ActivatedRoute, UrlSegment} from "@angular/router";
import {BudgetState} from "../../store/budget/state/BudgetState";

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent {

  currentBudget$: Observable<IBudget | undefined>;

  constructor(private store: Store, private route: ActivatedRoute) {
    this.currentBudget$ = this.route.url
      .pipe(
        map( urlSegments => {
          if(urlSegments.at(1)) return urlSegments?.at(1)?.toString() ?? '';
          return urlSegments?.at(0)?.toString() ?? '';
        }),
        switchMap(budgetId => {
           return this.store.select(BudgetState.getBudgets).pipe(
             map(budgetList => budgetList.find(budget => budget.id === budgetId))
           )
        }),
        tap(console.log)
      )

  }

}
