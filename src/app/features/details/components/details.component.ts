import { Component, OnInit, SecurityContext } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Movie } from '../../../shared/models/movie';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../not-found/components/not-found.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MovieCardComponent } from "../../../shared/components/movie-card/movie-card.component";

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  randomNumber: number = 0;
  isLoading: boolean = true;
  recommendations: Movie[] = [];
  videoLink:SafeUrl;

  movie: Movie | null = null;
  constructor(
    private movieService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {
    this.videoLink=this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = Number(params['id']);
      this.isLoading = true;

      this.movieService.getMovieById(movieId).subscribe({
        next: (movieData) => {
          this.movie = movieData;
          this.movieService.getMovieTrailerUrl(movieData.id).subscribe((video)=>{
            let safeurl=this.sanitizer.sanitize(SecurityContext.URL,video);
            if(safeurl) this.videoLink=this.sanitizer.bypassSecurityTrustResourceUrl(safeurl);
          })
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

    });
    
  }

  notFound(){
    location.replace("/not-found")
    return null;
  }
}
