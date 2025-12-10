import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth/auth';
import { Storage } from '../services/storage/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule], // formgroup for  bind 
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private AuthService:Auth,
    private storageService: Storage,
    private router: Router,
   
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null,[Validators.required]],
      password: [null,[Validators.required]]
    });
    
  }

  login(){
    console.log('Form values:', this.loginForm.value)
     this.AuthService.login(this.loginForm.value).subscribe((res: any)=>{ 
      console.log('Login response:', res);
      console.log('Response keys:', Object.keys(res));
      
      if(res.userId != null){
        console.log('UserId found, saving to localStorage');
        const user = {
          id: res.userId,
          userRole: res.userRole
        }
        console.log('User object to save:', user);
        this.storageService.saveUser(user);
        this.storageService.saveToken(res.jwt);
        
        if(Storage.isAdminLoggedIn()) {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/customer/dashboard']);
        }
        
        // Verify storage
        console.log('Saved user:', this.storageService.getUser());
        console.log('Saved token...:', this.storageService.getToken());
      } else {
        console.log('No userId in response');
        alert('Login failed, please try again');
      }
     }, error => {
       console.error('Login error:', error);
     })
  }
} 
