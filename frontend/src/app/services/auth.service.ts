import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>("/api/v1/login", {email, password})
  }
}

export type LoginResponse = {
  access_token: string;
}
