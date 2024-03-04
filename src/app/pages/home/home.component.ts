import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration} from "chart.js/auto";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {GetAllUserBudgets} from "../../store/budget/actions/BudgetActions";
import {Observable, tap} from "rxjs";
import {BudgetState} from "../../store/budget/state/BudgetState";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  availableSpend$: Observable<number>;

  ngOnInit() {
    this.renderChart();
  }

  navigateToPage(pageName: string){
    switch (pageName) {
      case 'budgets':
        this.router.navigate(['/budget']);
        break;
      default:
        break;
    }
  }

  ngAfterViewInit() {

    const myChart = new Chart('', {
      type: 'doughnut',
      data: {
        labels: ['Spent', 'Remaining'],
        datasets: [{
          label: '# of Votes',
          data: ['Spent', 'Remaining'],
          backgroundColor: ['red'],
          borderColor: [
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  renderChart(){
  }

  constructor(private router: Router, private store: Store) {
    // const testUser: IUser = {budgets: [], uid: "test", username: "johnny@test.com"}
    // this.categories$ = this.apiService.getBudgetsByUserId('test');
    this.store.dispatch(new GetAllUserBudgets('john.doe@test.com'))
    this.availableSpend$ = this.store.select(BudgetState.getAvailableSpend)
  }
}
