import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private valueSource = new BehaviorSubject<string>('initial value');
  value$ = this.valueSource.asObservable();

  updateValue(newVal: string) {
    this.valueSource.next(newVal);
  }
  constructor() { }
}
