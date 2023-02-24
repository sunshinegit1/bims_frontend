import { Component, Inject } from '@angular/core';

import { Router } from '@angular/router';

export interface DialogData {
    usr_data: any;
    timeline: any;
    animal: string;
    name: string;
}

@Component({
  selector: 'dialog-box',
  template: `<h1 mat-dialog-title>Your session expired</h1>
              <div mat-dialog-content>
                <p>Please login again.</p>
              </div>
              <div mat-dialog-actions>
                <button mat-raised-button color="accent" (click)="goToLogin()" style="width: 100%;">Login</button>
              </div>`,
              styleUrls:['./sessionPopups.scss']
})
export class SessionPopup {

  constructor(
   
  
    private router: Router) {
    localStorage.clear();
  }

  goToLogin(): void {
    
    this.router.navigate(['/']);
  }

}
