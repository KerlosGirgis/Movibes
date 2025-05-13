import { CommonModule } from "@angular/common";
import { Component, Input, OnChanges, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from "../../core/services/auth.service";
import { SidebarService } from "../../core/services/sidebar.service";
import { Auth, authState, User } from "@angular/fire/auth";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-sidebar",
  imports: [CommonModule, RouterLink, RouterLinkActive],

  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent implements OnInit,OnChanges {
  isloged: boolean = false;

  constructor(
    public sidebarService: SidebarService,
    private authService: AuthService,
    private auth:Auth
  ) {}
  async ngOnChanges(): Promise<void> {
    const user = await this.getCurrentUser();
    if(user!=null){
      this.isloged=true;
    }
    else{
      this.isloged=false;
    }
  }
  async ngOnInit(): Promise<void> {
        const user = await this.getCurrentUser();
    if(user!=null){
      this.isloged=true;
    }
    else{
      this.isloged=false;
    }
  }
    private async getCurrentUser(): Promise<User | null> {
      return await firstValueFrom(authState(this.auth));
    }
  selectedSection: number = 1;
  section: ISection[] = [
    { icon: "🏠 ", name: "Home", id: 1, href: "/movies" },
    {
      icon: "🎥 ",
      name: "Now Playing",
      id: 2,
      href: "/movies/movies-categories",
      param: "now_playing",
    },
    {
      icon: "🔥 ",
      name: "Popular",
      id: 3,
      href: "/movies/movies-categories",
      param: "popular",
    },
    {
      icon: "⭐ ",
      name: "Top Rated",
      id: 4,
      href: "/movies/movies-categories",
      param: "top_rated",
    },
    {
      icon: "📡 ",
      name: "Upcoming",
      id: 5,
      href: "/movies/movies-categories",
      param: "upcoming",
    },
  ];
  navigate(id: number) {
    this.selectedSection = id;
  }
  logout() {
    this.authService.logout();
    location.reload();
  }
}
interface ISection {
  icon: string;
  name: string;
  id: number;
  href: string;
  param?: string;
}
