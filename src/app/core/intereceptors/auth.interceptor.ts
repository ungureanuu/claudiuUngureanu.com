import {
  HttpErrorResponse,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class AuthInterceptor implements HttpInterceptor {
    private getToken(): string {
        let access_token: string;

        localStorage.getItem('currentUser')
            ? access_token = JSON.parse(localStorage.getItem('currentUser')).access_token
            : access_token = '';
        return access_token;
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authReq = request.clone({
            headers: request.headers.set('Authorization', 'Bearer ' + this.getToken())
        });

        return next.handle(authReq).pipe(
            tap(
              event => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
              },
              (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        localStorage.clear();
                        window.location.reload();
                    }
                }
            }));
    }
}
