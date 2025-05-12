import { MovieCardComponent } from './../../shared/components/movie-card/movie-card.component';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarService } from '../../shared/services/sidebar.service';

@Component({
  selector: 'app-movies',
  imports: [
    RouterOutlet,
    SharedModule,
    HeaderComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent {
  constructor(public sidebarService: SidebarService) {}
}
