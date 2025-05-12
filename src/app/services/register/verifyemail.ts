import { Component, OnInit } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verifyemail.html',
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private auth: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Check email verification state
    onAuthStateChanged(this.auth, (user) => {
      if (!user) {
        this.toastr.error('No user found. Please log in again.', 'Error');
        this.router.navigate(['/login']);
        return;
      }

      if (user.emailVerified) {
        this.toastr.success('Email verified successfully!', 'Success');
        this.router.navigate(['/login']);
      }
    });
  }

  refreshStatus() {
    const user = this.auth.currentUser;
    if (user) {
      user.reload().then(() => {
        if (user.emailVerified) {
          this.toastr.success('Email verified successfully!', 'Success');
          this.router.navigate(['/login']);
        } else {
          this.toastr.info('Email is still not verified. Please check again.', 'Info');
        }
      }).catch((err) => {
        this.toastr.error('Failed to reload user. Try again later.', 'Error');
      });
    } else {
      this.toastr.error('User not found. Please log in again.', 'Error');
      this.router.navigate(['/login']);
    }
  }
}
