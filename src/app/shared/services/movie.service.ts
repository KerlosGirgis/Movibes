import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Movie } from '../../models/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '7906db679229c246149e72a36a5f6fd4';
  private baseUrl = 'https://api.themoviedb.org/3/movie';
  constructor(private http: HttpClient) {}

  getMovieById(id: number): Observable<Movie> {
    const url = `${this.baseUrl}/${id}`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http.get<Movie>(url, { params });
  }

  getMoviesByCategory(
    category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
    limit?: number
  ): Observable<Movie[]> {
    const url = `${this.baseUrl}/${category}`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.http
      .get<any>(url, { params })
      .pipe(map((res) => res.results.slice(0, limit)));
  }

  getPagedMoviesByCategory(
    category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
    page: number
  ): Observable<{ movies: Movie[]; numOfPages: number }> {
    const url = `${this.baseUrl}/${category}`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('page', page);
    return this.http
      .get<any>(url, { params })
      .pipe(
        map((res) => ({ movies: res.results, numOfPages: res.total_pages }))
      );
  }

  getNumberOfPages(
    category: 'now_playing' | 'popular' | 'top_rated' | 'upcoming'
  ): Observable<number> {
    const url = `${this.baseUrl}/${category}`;
    const params = new HttpParams().set('api_key', this.apiKey).set('page', 1);
    return this.http.get<any>(url, { params }).pipe(
      map((res) => {
        const totalResults = res.total_results;
        const totalPages = res.total_pages;
        return totalPages;
      })
    );
  }
  searchMovies(
    query: string = ''
  ): Observable<{ movies: Movie[]; totalPages: number }> {
    const url = `https://api.themoviedb.org/3/search/movie`;
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query);

    return this.http.get<any>(url, { params }).pipe(
      map((res) => ({
        movies: res.results,
        totalPages: res.total_pages,
      }))
    );
  }
  getRecommendations(movieId: number): Observable<Movie[]> {
    const url = `${this.baseUrl}/${movieId}/recommendations`;
    const params = new HttpParams().set('api_key', this.apiKey);
    return this.http.get<any>(url, { params }).pipe(map((res) => res.results));
  }
}
