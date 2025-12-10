import { Injectable } from '@angular/core';

const TOKEN ="token";
const USER="user";


@Injectable({
  providedIn: 'root',
})
export class Storage {
  
  constructor() {}

  public saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.localStorage.getItem(USER);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public getToken(): string | null {
    return window.localStorage.getItem(TOKEN);
  }

  public clear(): void {
    window.localStorage.removeItem(USER);
    window.localStorage.removeItem(TOKEN);
  }
static getUserRole(): string | null {
  const userStr = window.localStorage.getItem(USER);
  if (!userStr) {
    return null;
  }
  const user = JSON.parse(userStr);
  return user.userRole || null;
}

static isAdminLoggedIn(): boolean {
  if (window.localStorage.getItem(TOKEN) == null) return false;
  const role: string | null = this.getUserRole();
  return role === "ADMIN";
}
static isCustomer(): boolean {
  if (window.localStorage.getItem(TOKEN) == null) return false;
  const role: string | null = this.getUserRole();
  return role === "CUSTOMER";
}

//logout method to clear storage  
static logout(): void {
  window.localStorage.removeItem(USER);
  window.localStorage.removeItem(TOKEN);
}



 
}
