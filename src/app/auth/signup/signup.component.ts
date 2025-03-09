import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(8)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  get username() { return this.signupForm.get('username'); }
  get password() { return this.signupForm.get('password'); }
  get confirmPassword() { return this.signupForm.get('confirmPassword'); }

  getPasswordStrength(): string {
    const value = this.signupForm.get('password')?.value;
    if (!value) return '';

    let strength = 'Weak';
    if (/[A-Z]/.test(value) && /[a-z]/.test(value) && /[@$!%*?&]/.test(value) && value.length >= 8) {
      strength = 'Strong';
    } else if (/[A-Z]/.test(value) || /[a-z]/.test(value) || /[@$!%*?&]/.test(value) && value.length >= 6) {
      strength = 'Medium';
    }
    return strength;
  }

  signup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        console.log('User registered:', response);
        alert('Registration successful! Please login.');
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. ';

        if (error.status === 0) {
          this.errorMessage += 'Cannot connect to the server. Please ensure the backend is running.';
        } else if (error.error?.message) {
          this.errorMessage += error.error.message;
        } else {
          this.errorMessage += 'Please try again later.';
        }
      }
    });
  }
}
