import { LoginService } from './security/login/login.service';
import { NotificationService } from './shared/messages/notification.service';
import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';

// import { throwError } from 'rxjs/operators'

import { HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService, private injector: Injector,
    private zone: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any) {
    const message = errorResponse.error.message
    this.zone.run(() => {
      if (errorResponse instanceof HttpErrorResponse) {
        switch (errorResponse.status) {
          case 401:
            this.injector.get(LoginService).handleLogin()
            break;
          case 403:
            this.ns.notify(message || 'Não autorizado.')
            break;
          case 404:
            this.ns.notify(message || 'Recurso não encontrado. Verifique o console para mais detalhes.')
            break;
        }
      }
    })
    super.handleError(errorResponse)
  }
}
