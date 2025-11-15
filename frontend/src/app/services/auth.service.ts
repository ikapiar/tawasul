import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  currentUserInfo(): Observable<AuthorizedUser> {
    return this.http.get<AuthorizedUser>("/api/v1/auth/me")
  }
}

export type AuthorizedUser = {
  email: string;
  roles: string[];
}
