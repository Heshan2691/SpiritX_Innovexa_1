import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log('User logged in:', response);
        this.authService.setUser(response); // Store user information
        alert('Login successful!');
        this.router.navigate(['/dashboard']); // Navigate to a landing page
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = 'Login failed. ';

        if (error.status === 0) {
          this.errorMessage += 'Cannot connect to the server. Please ensure the backend is running.';
        } else if (error.error?.message) {
          this.errorMessage += error.error.message;
        } else {
          this.errorMessage += 'Please check your credentials.';
        }
      }
    });
  }
}
