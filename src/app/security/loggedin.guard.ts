import { LoginService } from './login/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanLoad {

  constructor(private loginService: LoginService) { }

  canLoad(route: Route): boolean {
    const loggedin = this.loginService.isLoggedIn()
    if (!loggedin) {
      this.loginService.handleLogin(`/${route.path}`)
    }
    return loggedin
  }
}
