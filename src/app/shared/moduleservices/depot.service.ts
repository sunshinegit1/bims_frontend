import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepotService {

  apiURL = environment.apiUrl;

  constructor(private apiService: ApiService) { }

  getDepots(): Observable<any> {
    return this.apiService.getCall('/depot/getDepots').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createDepot(data: any): Observable<any> {
    return this.apiService.postCall('/depot/createDepot/', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  updateDepot(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/depot/updateDepot/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
