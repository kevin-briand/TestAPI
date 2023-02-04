import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsersService} from "../service/users.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private usersService: UsersService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(this.usersService.user.token && this.usersService.user.token != '') {
      request = request.clone({
        setHeaders: {
          Authorization: "Bearer " + this.usersService.user.token
        }
      });
    }

    return next.handle(request);
  }
}
