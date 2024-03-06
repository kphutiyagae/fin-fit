import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartConfiguration} from "chart.js/auto";
import {Router} from "@angular/router";
import {Select, Store} from "@ngxs/store";
import {AddBudget, GetAllUserBudgets, UpdateCurrentBudget} from "../../store/budget/actions/BudgetActions";
import {Observable, tap} from "rxjs";
import {BudgetState} from "../../store/budget/state/BudgetState";
import {IBudget} from "../../models/IBudget";
import {DatePipe} from "@angular/common";
import {IonModal} from "@ionic/angular";
import { OverlayEventDetail } from '@ionic/core/components';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit{

  availableSpend$: Observable<number>;
  budgetList$: Observable<IBudget[]>;

  @ViewChild(IonModal) addBudgetModal!: IonModal;
  private name: string = '';

  public addNewBudgetForm: FormGroup;

  ngOnInit() {
    this.renderChart();
  }

  navigateToPage(pageName: string){
    switch (pageName) {
      case 'budgets':
        // this.router.navigate(['/budget']);
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

  cancel() {
    this.addBudgetModal?.dismiss(null, 'cancel');
  }

  confirm() {
    this.addBudgetModal?.dismiss(this.name, 'confirm');
  }

  addNewBudget(){
    const newBudget: IBudget = {
      budgetLimit: this.addNewBudgetForm?.controls?.['budgetLimit'].value ?? 0,
      dateEnd: this.addNewBudgetForm?.controls?.['budgetDateEnd']?.value ?? '',
      dateStart: this.addNewBudgetForm?.controls?.['budgetDateStart']?.value ?? '',
      id: '',
      title: this.addNewBudgetForm?.controls?.['budgetTitle']?.value ?? '',
      totalExpense: this.addNewBudgetForm?.controls?.['TotalExpense']?.value ?? 0,
      transactions: []
    }

    this.store.dispatch(new AddBudget(newBudget))
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
  }
  constructor(private router: Router, private store: Store, private datePipe: DatePipe) {
    this.store.dispatch(new GetAllUserBudgets('test'))
    this.store.dispatch(new UpdateCurrentBudget('1wBI5MWcmIyhRyj0b60h'))
    this.availableSpend$ = this.store.select(BudgetState.getAvailableSpend)
    this.budgetList$ = this.store.select(BudgetState.getBudgets)
    this.addNewBudgetForm = new FormGroup({
      budgetTitle: new FormControl('', [Validators.required, Validators.minLength(1)]),
      budgetExpenses: new FormControl(0, [Validators.min(0)]),
      budgetLimit: new FormControl(0, [Validators.min(0), Validators.required]),
      budgetTransactions: new FormControl([]),
      budgetDateStart: new FormControl('', [Validators.required]),
      budgetDateEnd: new FormControl('')
    })
  }
}
