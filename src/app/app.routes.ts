import { Routes } from '@angular/router';
import { DetailsComponent } from './features/details/components/details.component';
import { HomeComponent } from './features/home/components/home.component';
import { MoviesCategoriesComponent } from './features/movies-categories/components/movies-categories.component';
import { NotFoundComponent } from './features/not-found/components/not-found.component';
import { WishlistComponent } from './features/wishlist/components/wishlist.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { MoviesComponent } from './features/movies/components/movies.component';
import { SearchComponent } from './layout/search/search.component';
import { ProfileComponent } from './features/profile/components/profile.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { VerifyEmailComponent } from './features/auth/components/register/verifyemail';
import { AuthGuard } from './core/guards/auth.guard';
import { UnauthorizedComponent } from './features/unauthorized/components/unauthorized.component';

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
        canActivate: [AuthGuard],
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
        canActivate: [AuthGuard],
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
