import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IonicModule } from '@ionic/angular';
import {HttpClientModule} from "@angular/common/http";
import {FIREBASE_OPTIONS} from "@angular/fire/compat";
import { environment } from "./environments/environment";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {getDatabase, provideDatabase} from "@angular/fire/database";
import {getFirestore, provideFirestore} from "@angular/fire/firestore";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {NgxsModule} from "@ngxs/store";
import {BudgetState} from "./store/budget/state/BudgetState";
import {NgxsReduxDevtoolsPluginModule} from "@ngxs/devtools-plugin";
import {DatePipe} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BudgetComponent,
    AnalyticsComponent,
    LoginComponent,
    SignupComponent,
    NavigationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    IonicModule.forRoot({}),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    NgxsModule.forRoot([
      BudgetState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    {provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig},
    {provide: DatePipe}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
