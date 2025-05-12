import { Component, inject, Input, OnInit } from '@angular/core';
import { Movie } from '../../../models/movie';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { MovieCardServiceService } from './movie-card-service.service';
import { doc, Firestore, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, authState, onAuthStateChanged, User } from '@angular/fire/auth';
import { firstValueFrom } from 'rxjs';
import { LoginRegisterPopupComponent } from "../login-register-popup/login-register-popup/login-register-popup.component";


@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, CommonModule, LoginRegisterPopupComponent],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent implements OnInit {

  
constructor(private firestore:Firestore) {}
  private auth = inject(Auth);
  @Input() movie!: Movie;
  isWishlistedF: boolean = false;
  isModalVisible: boolean = false;
  ngOnInit() {
    this.getIsWishlisted(this.movie.id).then((isWishlisted) => {
      this.isWishlistedF = isWishlisted;
    });
  }
  openModal(): void {
    this.isModalVisible = true;
  }
  async toggleWishlist(id:number) {
    this.toggleMovieInWishlist(id).then(() => {
      this.getIsWishlisted(id).then((isWishlisted) => {
        this.isWishlistedF = isWishlisted;
      });
    });
  }
  getIsWishlisted(id:number):Promise<boolean> {
    return this.isWishlisted(id);
  }

  ///////////////////////////////////////////////

  private async getCurrentUser(): Promise<User | null> {
    return await firstValueFrom(authState(this.auth));
  }

  async toggleMovieInWishlist(movieId: number) {
    const user = await this.getCurrentUser();
    if (!user){
      this.openModal();
      return;
    }

    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userSnap = await getDoc(userRef);

    let wishlist: number[] = [];

    if (userSnap.exists()) {
      wishlist = userSnap.data()?.['wishlist'] ?? [];
    }

    const index = wishlist.indexOf(movieId);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(movieId);
    }

    if (userSnap.exists()) {
      await updateDoc(userRef, { wishlist });
    } else {
      await setDoc(userRef, { wishlist });
    }
  }
  async isWishlisted(movieId: number): Promise<boolean> {
    const user = await this.getCurrentUser();
    if (!user) return false;

    const userRef = doc(this.firestore, `users/${user.uid}`);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const wishlist = userSnap.data()?.['wishlist'] ?? [];
      return wishlist.includes(movieId);
    }
    return false;
  }
}
