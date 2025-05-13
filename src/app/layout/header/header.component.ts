import {
  Component,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
} from "@angular/core";
import {
  Router,
  RouterEvent,
  RouterLink,
  RouterLinkActive,
} from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ApiService } from "../../core/services/api.service";
import { AuthService } from "../../core/services/auth.service";
import { SearchService } from "../../core/services/search.service";
import { SidebarService } from "../../core/services/sidebar.service";
import { Auth, authState, user, User } from "@angular/fire/auth";
import { firstValueFrom } from "rxjs";
import { doc, Firestore, getDoc } from "@angular/fire/firestore";

@Component({
  selector: "app-header",
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent implements OnInit, OnChanges {
  currenturl: string = "";
  searchquery: string = "";
  isSearch: boolean = false;
  isloged: number = 0;
  initial: String = "";
  wishlistLength: number = 0;
  constructor(
    public sidebarService: SidebarService,
    private router: Router,
    private movieService: ApiService,
    private searchService: SearchService,
    private authService: AuthService,
    private auth: Auth,
    private firestore: Firestore
  ) {}
  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    const user = await this.getCurrentUser();
    if (user != null) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);
      this.initial = userSnap.data()?.["name"].charAt(0);
      this.wishlistLength = userSnap.data()?.["wishlist"].length;
      this.isloged = 1;
    } else {
      this.isloged = 2;
    }
  }
  async ngOnInit(): Promise<void> {
    const user = await this.getCurrentUser();
    if (user != null) {
      const userRef = doc(this.firestore, `users/${user.uid}`);
      const userSnap = await getDoc(userRef);
      this.initial = userSnap.data()?.["name"].charAt(0);
      this.wishlistLength = userSnap.data()?.["wishlist"].length;
      this.isloged = 1;
    } else {
      this.isloged = 2;
    }
  }

  private async getCurrentUser(): Promise<User | null> {
    return await firstValueFrom(authState(this.auth));
  }
  getCurrentUrl() {
    if (this.router.url !== "/movies/search") {
      this.currenturl = this.router.url;
      console.log(this.currenturl);
    }
  }
  search(): void {
    const query = this.searchquery.trim();

    if (query) {
      this.isSearch = true;
      this.searchService.updateValue(query);
      console.log("Search:", query);
      this.router.navigate(["/movies/search"]);
    } else if (this.isSearch) {
      this.clearSearch();
    }
  }

  reset(): void {
    this.clearSearch();
  }

  private clearSearch(): void {
    this.isSearch = false;
    this.searchquery = "";
    this.searchService.updateValue("");
    if (this.router.url == "/movies/search") {
      this.router.navigate([this.currenturl]);
    }
  }
}
