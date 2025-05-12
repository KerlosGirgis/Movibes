import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SharedModule } from './../../shared.module';
import { Component, Input } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../../models/movie';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [SharedModule, MovieCardComponent,NgForOf],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  constructor(private movieService: MovieService) {}
  @Input() category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' = 'popular';
  title: string = '';
  movies: Movie[] = [];
  ngOnChanges() {
    this.title = this.category.replace(/_/g, ' ').toUpperCase();
  }
  ngOnInit() {
    this.movieService.getMoviesByCategory(this.category, 6).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
