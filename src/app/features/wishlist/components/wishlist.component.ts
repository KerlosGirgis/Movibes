import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../../core/services/wishlist.service';
import { ApiService } from '../../../core/services/api.service'; 
import { Movie } from '../../../shared/models/movie';
import { forkJoin } from 'rxjs';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';

@Component({
  selector: 'app-wishlist',
   imports: [
    MovieCardComponent,CommonModule ],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlistedMovies: Movie[] = [];
  isLoading = true;

  constructor(
    private wishlistService: WishlistService,
    private moviesService: ApiService
  ) {}

  ngOnInit(): void {
    this.wishlistService.getWishlist().subscribe(ids => {
      if (!ids || ids.length === 0) {
        this.isLoading = false;
        this.wishlistedMovies = [];
        return;
      }

      const movieRequests = ids.map(id => this.moviesService.getMovieById(id));
      forkJoin(movieRequests).subscribe(movies => {
        this.wishlistedMovies = movies;
        this.isLoading = false;
      });
    });
  }
}
