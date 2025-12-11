import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = "http://localhost:8081";

@Injectable({
  providedIn: 'root',
})
export class AdminService {
    constructor(private http: HttpClient) {}

    postcar(cardto: any) {
        const url = BASE_URL + "/api/admin/postcar";
        console.log('Admin Service - Making API call to:', url);
        console.log('Admin Service - Request payload:', cardto);
        return this.http.post(url, cardto, {
            headers: this.createAuthorizationHeader()
        });
    }

    createAuthorizationHeader(): HttpHeaders {
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
            'Authorization',
            'Bearer ' + localStorage.getItem('token')
        );
    }
}