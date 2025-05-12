import {
  Component,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  Router,
  RouterEvent,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { SearchService } from '../../core/services/search.service';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currenturl: string = '';
  searchquery: string = '';
  isSearch: boolean = false;
  isloged: boolean = false;
  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private movieService: ApiService,
    private searchService: SearchService,
    private authService: AuthService
  ) {
    this.isloged = this.authService.isLogged();
  }

  getCurrentUrl() {
    if (this.router.url !== '/movies/search') {
      this.currenturl = this.router.url;
      console.log(this.currenturl);
    }
  }
 search(): void {
  const query = this.searchquery.trim();

  if (query) {
    this.isSearch = true;
    this.searchService.updateValue(query);
    console.log('Search:', query);
    this.router.navigate(['/movies/search']);
  } else if (this.isSearch) {
    this.clearSearch();
  }
}

reset(): void {
  this.clearSearch();
}

private clearSearch(): void {
  this.isSearch = false;
  this.searchquery = '';
    this.searchService.updateValue('');
    if (this.router.url=='/movies/search') {
  this.router.navigate([this.currenturl]);}
}}
