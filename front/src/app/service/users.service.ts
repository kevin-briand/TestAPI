import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {Router} from "@angular/router";
import {Header} from "../model/header";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _user: User;

  private _urlLogin = 'http://localhost:8000/api/login';
  constructor(private router: Router, private http: HttpClient) {
    this._user = new User();
  }

  login(user: User): Observable<any> {
    this._user = user;
    return this.http.post<any>(this._urlLogin, user, new Header());
  }

  get user(): User {
    return this._user;
  }

  isAuthentified() {
    return (this._user.token && this._user.token != '')
  }

  tokenExpired() {
    this._user.token = '';
    this.router.navigate(['/login']);
  }

  clearPassword() {
    this._user.password = '';
  }

  hasError(error: string) {
    if(error.indexOf('Expired') != -1) {
      this.tokenExpired();
    }
    return error;
  }
}
