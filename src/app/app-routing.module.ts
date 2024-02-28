import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AnalyticsComponent} from "./pages/analytics/analytics.component";
import {BudgetComponent} from "./pages/budget/budget.component";
import {LoginComponent} from "./pages/login/login.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  {
    path: 'analytics',
    component: AnalyticsComponent
  },
  {
    path: 'budget',
    component: BudgetComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
