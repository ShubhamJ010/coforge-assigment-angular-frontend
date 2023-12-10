import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserData } from '../Model/userData.model';

@Injectable({
  providedIn: 'root',
})
export class UserFetchService {
  private dataUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUserData(): Observable<UserData[]> {
    return this.http.get<UserData[]>(`${this.dataUrl}/all`);
  }
  addUserData(user: UserData): Observable<UserData> {
    return this.http.post<UserData>(`${this.dataUrl}/add`, user);
  }

  removeUserData(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.dataUrl}/delete/${id}`);
  }

  getUserDataById(id:number):Observable<UserData>
  {
    return this.http.get<UserData>(`${this.dataUrl}/${id}`)
  }
  updateUser(updatedUserData: UserData): Observable<UserData> {
    const url = `${this.dataUrl}/update`;
    return this.http.put<UserData>(url, updatedUserData);
  }
}
