import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { sendEmailVerification } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ]
})

export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/)
      ]],
      password: ['', [
        Validators.required,

        Validators.minLength(8),
        this.strongPasswordValidator
      ]],
      confirmPassword: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.pattern(/^(01){1}(0|1|2|5){1}([0-9]{8})$/)
      ]],
      age: ['', [
        Validators.required,
        Validators.min(18),
        Validators.max(100)
      ]],
      terms: [false, Validators.requiredTrue]
    }, { validators: this.passwordsMatchValidator });
  }

  get f() {
    return this.registerForm.controls;
  }

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecial = /[\W_]/.test(value);
    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
    return !valid ? { weak: true } : null;
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.toastr.error('Please fix the errors in the form.', 'Form Error');
      return;
    }

    const { email, password, name, phone, age } = this.registerForm.value;

    this.authService.register(email, password, name, phone, age)
      .then((userCredential) => {
        if (userCredential?.user) {
          sendEmailVerification(userCredential.user)

              this.authService.logout();
              this.router.navigate(['/login']);
            }
            })

      .catch(error => {
        this.toastr.error(error.message, 'Registration Failed');
      });
  }

  googleLogin(): void {
    this.authService.googleLogin()
      .then(() => {
        this.toastr.success('Signed in with Google');
        this.router.navigate(['/']);
      })
      .catch((error: { message: string | undefined }) => {
        this.toastr.error(error.message, 'Google Sign-In Failed');
      });
  }
}
