import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onLogin(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toastr.error('Please fix the errors in the form.', 'Form Error');
      return;
    }

    const { email, password } = this.loginForm.value;
    this.auth.login(email, password)
      .then(() => {
        this.toastr.success('Login successful');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Login Failed');
      });
  }

  googleLogin(): void {
    this.auth.googleLogin()
      .then(() => {
        this.toastr.success('Signed in with Google successfully');
        this.router.navigate(['/']);
      })
      .catch(err => {
        this.toastr.error(err.message, 'Google Sign-In Failed');
      });
  }
}
