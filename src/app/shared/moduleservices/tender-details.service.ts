import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../providers/api.service';

@Injectable({
  providedIn: 'root'
})
export class TenderDetailsService {

  constructor(private http: HttpClient,
    private apiService: ApiService) { }

  getTenderDetails(): Observable<any>{
    return this.apiService.getCall('/tender/getTenders').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  createTenderDetail(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/tender/createTender', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateTenderDetail(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/tender/updateTender/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getTenderDetailById(id: any): Observable<any>{
    return this.apiService.getCall('/tender/getTender/'+id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateTenderUserStatus(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/tender/updateTenderUserStatus/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getVendorTenders(): Observable<any>{
    return this.apiService.getCall('/tender/getVendorTenders').pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  
  assignTender(id: any, postDataObj: any): Observable<any>{
    return this.apiService.postCall('/tender/assignTender/'+id,postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
