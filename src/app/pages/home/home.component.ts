import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration} from "chart.js/auto";
import {Router} from "@angular/router";
import {ApiService} from "../../services/api/api.service";
import {Observable, tap} from "rxjs";
import {ITransactionType} from "../../models/ITransactionType";
import {IUser} from "../../models/IUser";
import {IBudget} from "../../models/IBudget";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  categories$: Observable<IBudget[]>
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

  constructor(private router: Router, private apiService: ApiService) {
    const testUser: IUser = {budgets: [], uid: "test", username: "johnny@test.com"}
    this.categories$ = this.apiService.getBudgetsByUserId('test').pipe(tap(console.log));
  }
}
