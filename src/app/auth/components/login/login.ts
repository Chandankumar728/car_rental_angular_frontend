import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../services/auth/auth';

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
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: [null,[Validators.required]],
      password: [null,[Validators.required]]
    });
    
  }

  login(){
    console.log(this.loginForm.value)
     this.AuthService.login(this.loginForm.value).subscribe((res=>{
      console.log(res);
     }))
  }
} 
