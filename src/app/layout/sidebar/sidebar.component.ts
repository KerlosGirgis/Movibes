import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { SidebarService } from '../../core/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule,RouterLink,RouterLinkActive],

  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
isloged :boolean = false;

  constructor(public sidebarService: SidebarService , private authService:AuthService) {
    this.isloged = this.authService.isLogged();
  }

selectedSection: number = 1;
  section: ISection[] = [
    {icon: '🏠 ', name: 'Home', id: 1 ,href:"/movies"},
    { icon: '🎥 ', name: 'Now Playing', id: 2, href: '/movies/movies-categories', param: 'now_playing' },
    { icon: '🔥 ', name: 'Popular', id: 3, href: '/movies/movies-categories',param: 'popular' },
    { icon: '⭐ ', name: 'Top Rated', id: 4, href: '/movies/movies-categories',param: 'top_rated' },
    { icon: '📡 ', name: 'Upcoming', id: 5, href: '/movies/movies-categories',param: 'upcoming' },
  ];
  navigate(id: number) {
this.selectedSection= id
  }
  logout(){
    this.authService.logout();
    location.reload();

  };

}
interface ISection {
  icon:string
  name: string;
  id: number;
  href: string;
  param?: string
}

