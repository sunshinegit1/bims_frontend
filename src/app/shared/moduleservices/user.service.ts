import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../providers/api.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiURL = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }

  createUser(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/user/createUser', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateUser(id: any, postDataObj: any): Observable<any> {
    return this.apiService.patchCall('/user/updateUser/' + id, postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getAllUsers(): Observable<any>{
    return this.apiService.getCall('/user/getUsers').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getUserById(id: any): Observable<any>{
    return this.apiService.getCall('/user/getUserById/'+ id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  checkToken(): Observable<any> {
    return this.apiService.getCall('/user/checkToken').pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  login(postDataObj: any): Observable<any> {
    return this.apiService.postCall('/user/login', postDataObj).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

}
