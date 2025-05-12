import { Routes } from '@angular/router';
import { DetailsComponent } from './components/details/details.component';
import { HomeComponent } from './components/home/home.component';
import { MoviesCategoriesComponent } from './components/movies-categories/movies-categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { LoginComponent } from './services/login/login.component';
import { RegisterComponent } from './services/register/register.component';
import { VerifyEmailComponent } from './services/register/verifyemail';
import { MoviesComponent } from './components/movies/movies.component';
import { SearchComponent } from './components/search/search.component';
import { authGuardGuard } from './guards/auth-guard.guard';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/movies', pathMatch: 'full' },
  {
    path: 'movies',
    component: MoviesComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [authGuardGuard],
      },
      { path: 'movies-categories/:id', component: MoviesCategoriesComponent },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'search', component: SearchComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: NotFoundComponent },
];
