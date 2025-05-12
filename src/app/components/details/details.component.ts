import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../not-found/not-found.component';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  randomNumber: number = 0;
  isLoading: boolean = true;
  recommendations: Movie[] = [];

  movie: Movie | null = null;
  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = Number(params['id']);
      this.isLoading = true;

      this.movieService.getMovieById(movieId).subscribe({
        next: (movieData) => {
          this.movie = movieData;
          this.isLoading = false;
        },
        error: () => {
          this.movie = null;
          this.isLoading = false;
        },
      });

      this.movieService.getRecommendations(movieId).subscribe((movies) => {
        this.recommendations = movies;
      });

      this.generateRandomNumber();
    });
  }

  generateRandomNumber(): void {
    this.randomNumber = Math.floor(Math.random() * 100) + 1;
  }
}
