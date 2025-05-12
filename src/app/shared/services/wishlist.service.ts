import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData,doc,getDoc,docData } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
 import { Observable, of, switchMap } from 'rxjs';
import { Movie } from '../../models/movie';
import { authState } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
 

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private firestore = inject(Firestore);
  private auth = inject(Auth);


  getWishlist(): Observable<number[]> {
  return authState(this.auth).pipe(
    switchMap(user => {
      if (!user) return of([]);

      const userRef = doc(this.firestore, `users/${user.uid}`);
      return docData(userRef).pipe(
        map(data => data?.['wishlist'] ?? [])
      );
    })
  );
}



}


