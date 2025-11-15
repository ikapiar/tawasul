import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthorizedUser} from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class Globals {
  private readonly sampleEmail = 'anon@anon.org'
  private _user = new BehaviorSubject<AuthorizedUser>({
    email: this.sampleEmail,
    roles: [],
  })
  user$ = this._user.asObservable();

  getUser() {
    if (this._user.value.email === this.sampleEmail) {
      throw new Error('User is null')
    }
    return this._user.value;
  }

  setUser(user: AuthorizedUser) {
    this._user.next(user);
  }
}
