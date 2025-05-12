import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesCategoriesComponent } from './movies-categories.component';

describe('MoviesCategoriesComponent', () => {
  let component: MoviesCategoriesComponent;
  let fixture: ComponentFixture<MoviesCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
