import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth } from '../services/auth/auth';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {

  isSpinning: boolean = false;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group(
      {
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6)]],
        checkPassword: [null, [Validators.required]]
      },
      {
        validators: [this.passwordMatchValidator]  
      }
    );
  }

  //  Custom validator for matching passwords
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirm = control.get('checkPassword')?.value;

    return password === confirm ? null : { passwordsMismatch: true };
  }

  // Submit handler
  onSubmit() {
    console.log('Form submitted!');
    console.log('Form valid:', this.signupForm.valid);
    console.log('Form values:', this.signupForm.value);
    
    if (this.signupForm.invalid) {
      console.log('Form is invalid, marking all as touched');
      this.signupForm.markAllAsTouched();
      return;
    }

    this.isSpinning = true;
    console.log(' Starting registration process...');

    const registerData = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

   
    this.authService.register(registerData)
      .subscribe({
        next: (response) => {
          console.log(' Registration successful:', response);
          this.isSpinning = false;
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(' Registration failed:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Full error object:', error);
          this.isSpinning = false;
        }
      });
  }
}
