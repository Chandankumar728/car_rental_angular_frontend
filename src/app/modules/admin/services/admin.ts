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

    //get all cars
    getAllCars() {
        const url = BASE_URL + "/api/admin/get-all-cars";
        return this.http.get(url, {
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

   
  // Example: /api/admin/car/123
 
  getCarById(carId: string) {
    const url = `${BASE_URL}/api/admin/car/${carId}`;
    return this.http.get(url, {
      headers: this.createAuthorizationHeader()
    });
  }

  
  // Example: /api/admin/update-car/123
 
  updateCar(carId: string, carData: any) {
    const url = `${BASE_URL}/api/admin/update-car/${carId}`;
    return this.http.put(url, carData, {
      headers: this.createAuthorizationHeader()
    });
  }

 
  // DELETE Car
  

  deleteCar(carId: string) {
    const url = `${BASE_URL}/api/admin/delete-car/${carId}`;
    return this.http.delete(url, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Employee Management APIs can be added here 
  getAllEmployees() {
    const url = `${BASE_URL}/api/admin/employees`;
    return this.http.get(url, {
      headers: this.createAuthorizationHeader()
    });
  }

  //add employee
  addEmployee(employeeData: any) {
    const url = `${BASE_URL}/api/admin/employees`;
    return this.http.post(url, employeeData, {
      headers: this.createAuthorizationHeader()
    });
  }

  //delete employee
  deleteEmployee(employeeId: number) {
    const url = `${BASE_URL}/api/admin/employees/${employeeId}`;
    return this.http.delete(url, {
      headers: this.createAuthorizationHeader()
    });
  }

  //update employee
  updateEmployee(employeeId: number, employeeData: any) {
    const url = `${BASE_URL}/api/admin/employees/${employeeId}`;
    return this.http.put(url, employeeData, {
      headers: this.createAuthorizationHeader()
    });
  }

  //get details of a single employee by id
  getEmployeeById(employeeId: number) {
    const url = `${BASE_URL}/api/admin/employees/${employeeId}`;
    return this.http.get(url, {
      headers: this.createAuthorizationHeader()
    });
  }

 

  

}