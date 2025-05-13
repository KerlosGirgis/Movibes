
import { Component, type OnInit } from "@angular/core"
import{CommonModule}  from '@angular/common';
import { ApiService } from "../../../core/services/api.service";
import { Movie } from "../../../shared/models/movie";

interface Slide {
  title: string
  image: string
}

@Component({
  selector: "app-hero",
  imports:[CommonModule],
  templateUrl: "./hero.component.html",
})
export class HeroComponent implements OnInit {
  movies:Movie[]=[];
  images:string[]=[];
  constructor(
    private apiService:ApiService
  ){}
  ngOnInit(){
    this.apiService.getMoviesByCategory("popular", 6).subscribe((movies) => {
      this.movies = movies;
    });
  }
}

