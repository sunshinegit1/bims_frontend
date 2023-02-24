import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { NotificationService } from '../../common/notification.service';
import { GlobalConstants } from 'src/app/shared/common/global_constants';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    if(token){
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }    
    
    return next.handle(request).pipe( 
      catchError((error) => {  
        if(error instanceof HttpErrorResponse){
          console.log("Interceptor Error: ", error.url);
          if(error.status === 401 || error.status === 402 || error.status === 403){
            if(this.router.url === '/'){}
            else{
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          } 
        }
        if(error.status === 0) {
          error.error.message = "ERR_INTERNET_DISCONNECTED";
        }
        if(!request.url.includes('internal/auth')){
          this.notificationService.createNotification('error', error?.error?.message ?? GlobalConstants.genericError);  
        }
        return throwError(error);
      })   
    );
  }
}
