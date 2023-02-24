import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/providers/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  apiURL = environment.apiUrl;

  constructor(private apiService: ApiService) { }

  getZones(): Observable<any> {
    return this.apiService.getCall('/zone/getZones').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  createZone(data: any): Observable<any> {
    return this.apiService.postCall('/zone/createZone', data).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  updateZone(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/zone/updateZone/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
