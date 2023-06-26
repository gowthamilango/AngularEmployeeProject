import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postEmployee(data: any) {
    return this.http.post<any>("http://localhost:3000/addEmployee/", data);
  }

  getEmployee() {
    return this.http.get<any>("http://localhost:3000/addEmployee/");
  }
  putEmployee(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/addEmployee/" + id, data);
  }

  deleteEmployee(id: number) {
    return this.http.delete<any>("http://localhost:3000/addEmployee/" + id);
  }

}
