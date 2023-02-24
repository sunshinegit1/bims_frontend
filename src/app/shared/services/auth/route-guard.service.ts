import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { NotificationService } from '../../common/notification.service';
import jwt_decode from 'jwt-decode';
import { GlobalConstants } from '../../common/global_constants';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(
    public authService: AuthService,
    public router: Router,
    private notificationService: NotificationService,    
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    
    // let expectedRoleArray = { expectedRole: ['admin','user'] }
    let expectedRoleArray = ['admin','user','vendor','super_admin','super_user'];

    const token: any = localStorage.getItem('token');
    var tokenPayload: any;
    try{
      tokenPayload = jwt_decode(token);
      // console.log("==tokenPayload==",tokenPayload);
    } catch(err) {
      localStorage.clear();
      this.router.navigate(['/']); 
    }

    let checkRole = false;
    for(let i=0; i<expectedRoleArray['length']; i++){
      if(expectedRoleArray[i] === tokenPayload.role){
        checkRole = true;
      }
    }

    if(tokenPayload.role === 'user' || tokenPayload.role=== 'admin'){
      if(this.authService.isAuthenticated() && checkRole) {
        return true
      }
      this.notificationService.createNotification(GlobalConstants.unathorized, 'error');
      this.router.navigate(['/internal/dashboard']);      
      return false;
    } else {
      this.router.navigate(['/']);
      localStorage.clear();
      return false;
    }

  }
}
