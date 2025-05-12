import { Component, OnChanges, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../shared/components/movie-card/movie-card.component";
import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../shared/services/movie.service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movies-categories',
  imports: [MovieCardComponent,MovieCardComponent,CommonModule,NgFor],
  templateUrl: './movies-categories.component.html',
  styleUrl: './movies-categories.component.css'
})
export class MoviesCategoriesComponent implements OnInit {
  movies: Movie[] = [];
  numOfPages: number[] = [];
  currentPage: number = 1;
  category!: 'now_playing' | 'popular' | 'top_rated' | 'upcoming';

  constructor(private route: ActivatedRoute,private movieService:MovieService) {
  }

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
     this.category = params.get('id') as 'now_playing' | 'popular' | 'top_rated' | 'upcoming';
      this.movieService.getPagedMoviesByCategory(this.category, this.currentPage).subscribe((data) => {
        this.movies = data.movies;
        this.currentPage = 1;
        this.numOfPages = Array.from({ length: data.numOfPages }, (_, i) => i + 1)
        .slice(Math.max(0, this.currentPage - 3), this.currentPage + 2);
});
  });
}
  onPageChange(page: number) {
    this.currentPage = page;
    this.movieService.getPagedMoviesByCategory(this.category, this.currentPage).subscribe((data) => {
      this.movies = data.movies;
      this.numOfPages = Array.from({ length: data.numOfPages }, (_, i) => i + 1)
      .slice(Math.max(0, this.currentPage - 3), this.currentPage + 2);
});
  }
  onNextPage() {
    if (this.currentPage >= this.numOfPages[this.numOfPages.length - 1]) {
      return;
    }
    this.currentPage++;
    this.movieService.getPagedMoviesByCategory(this.category, this.currentPage).subscribe((data) => {
      this.movies = data.movies;
      this.numOfPages = Array.from({ length: data.numOfPages }, (_, i) => i + 1)
      .slice(Math.max(0, this.currentPage - 3), this.currentPage + 2);
});
  }
  onPrevPage() {
    if (this.currentPage <= 1) {
      return;
    }
    this.currentPage--;
    this.movieService.getPagedMoviesByCategory(this.category, this.currentPage).subscribe((data) => {
      this.movies = data.movies;
      this.numOfPages = Array.from({ length: data.numOfPages }, (_, i) => i + 1)
      .slice(Math.max(0, this.currentPage - 3), this.currentPage + 2);
});
  }
}
