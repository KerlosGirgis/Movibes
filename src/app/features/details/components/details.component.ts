import { Component, OnChanges, OnInit, SecurityContext, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { Movie } from '../../../shared/models/movie';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from '../../not-found/components/not-found.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MovieCardComponent } from "../../../shared/components/movie-card/movie-card.component";
import { filter } from 'rxjs';

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
  private routerSub: any;
  movie: Movie | null = null;
  constructor(
    private movieService: ApiService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {
    this.videoLink=this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }
  ngOnInit(): void {
        this.routerSub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
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

    ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
