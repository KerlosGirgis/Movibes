import { Component } from '@angular/core';
import { MovieListComponent } from '../../../shared/components/movie-list/movie-list.component';
import { HeroComponent } from "../../slider/components/hero.component";

@Component({
  selector: 'app-home',
  imports: [MovieListComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
