import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MovieService } from '../../shared/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { CommonModule, NgFor } from '@angular/common';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { SearchService } from '../../shared/services/search.service';

@Component({
  selector: 'app-search',
  imports: [MovieCardComponent, MovieCardComponent, CommonModule, NgFor],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  movies: Movie[] = [];

  constructor(
    private movieService: MovieService,
    private searchService: SearchService
  ) {}
  ngOnInit() {
    this.searchService.value$.subscribe((val) => {
      this.movieService.searchMovies(val).subscribe((data) => {
        this.movies = data.movies;
        // React to the change here
      });
    });
  }
}
