import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Store } from "@ngxs/store";
import {AddUser} from "../../store/user/actions/user.actions";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth, private userStore: Store) { }

  attemptSignUp(username: string, password: string){
    this.fireAuth.createUserWithEmailAndPassword(username,password)
      .then( result => result.user)
      .catch((error: Error) => console.log(error.message))
  }

  attemptLogin(username: string, password: string){
    this.fireAuth.signInWithEmailAndPassword(username,password)
      .then( (result) => {
        if(result.user){
          const loggedInUser: User = {
            id: result?.user?.uid ?? '',
            email: result?.user?.email ?? '',
            name: result?.user?.displayName ?? ''
          }

          this.userStore.dispatch(new AddUser(loggedInUser));
        }
      })
      .catch((error: Error) => console.log(error))
  }
}
