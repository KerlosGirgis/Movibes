import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Auth, authState, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  private auth = inject(Auth);
  private authService = inject(AuthService);

  loading = true;
  userData: any = null;
  user$: Observable<User | null> = authState(this.auth);

  ngOnInit(): void {
    console.log('Profile component initialized');
    
    this.user$.subscribe({
      next: async (user) => {
        console.log('Auth state changed, user:', user);
        
        if (user) {
          try {
            console.log('Fetching user data for UID:', user.uid);
            this.userData = await this.authService.getUserData(user.uid);
            console.log('User data fetched:', this.userData);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        } else {
          console.log('No user logged in');
        }

        this.loading = false;
        console.log('Loading complete, user data:', this.userData);
      },
      error: (err) => {
        console.error('Error observing auth state:', err);
        this.loading = false;
      }
    });
  }
}
