import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Base URL for your Spring Boot backend API
// Make sure it ends with "/" to avoid URL errors.
const BASE_URL = "http://localhost:8081";

@Injectable({
  providedIn: 'root', // Makes this service available everywhere in the app
})
export class Auth {

  constructor(private http: HttpClient) {}

  /**
   * register()
   * This method sends a POST request to the backend to register a new user.
   *
   * @param signUpRequest - the data from your signup form (name, email, password, etc.)
   * @returns Observable from HttpClient which the component will subscribe to
   */
  register(signUpRequest: any) {
    const url = BASE_URL + "/api/auth/signup";
    console.log(' Auth Service - Making API call to:', url);
    console.log(' Auth Service - Request payload:', signUpRequest);

    // Sends POST request to: http://localhost:8080/api/auth/signup
    return this.http.post(url, signUpRequest);
  }

  login(loginRequest: any) {
    const url = BASE_URL + "/api/auth/login";
    console.log(' Auth Service - Making API call to:', url);
    console.log(' Auth Service - Request payload:', loginRequest);

    // Sends POST request to: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
    return this.http.post(url, loginRequest);
  }
}
