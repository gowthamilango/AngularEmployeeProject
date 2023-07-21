import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://localhost:9191/employee";

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>(this.baseURL + "/add", data);
  }

  getEmployee() {
    return this.http.get<any>(this.baseURL + "/all");
  }
  putEmployee(data: any, id: number) {
    return this.http.put<any>(this.baseURL + "/update/"+ id, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>(this.baseURL + "/delete/" + id);
  }

}
