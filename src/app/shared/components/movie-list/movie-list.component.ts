import { MovieCardComponent } from '../movie-card/movie-card.component';
import { SharedModule } from './../../shared.module';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Movie } from '../../models/movie';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [SharedModule, MovieCardComponent,NgForOf],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit,OnChanges {
  constructor(private apiService: ApiService) {}
  @Input() category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming' = 'popular';
  title: string = '';
  movies: Movie[] = [];
  ngOnChanges() {
    this.title = this.category.replace(/_/g, ' ').toUpperCase();
  }
  ngOnInit() {
    this.apiService.getMoviesByCategory(this.category, 6).subscribe((movies) => {
      this.movies = movies;
    });
  }
}
