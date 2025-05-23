import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../core/services/auth.service';
import { Movie } from '../../../../shared/models/movie';
import { ApiService } from '../../../../core/services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  movie!:Movie;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private apiService:ApiService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/)
      ]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.apiService.getMoviesByCategory("popular", 6).subscribe((movies) => {
      this.apiService.getMovieById(movies[0].id).subscribe((movie)=>{
        this.movie=movie
      })
      
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
