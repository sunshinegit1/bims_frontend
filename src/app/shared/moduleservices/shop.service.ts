import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  apiURL = environment.apiUrl;

  constructor(private apiService: ApiService) { }

  getShops(): Observable<any> {
    return this.apiService.getCall('/shop/getShops').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createShop(data: any): Observable<any> {
    return this.apiService.postCall('/shop/createShop/', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  updateShop(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/shop/updateShop/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
