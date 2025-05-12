import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRegisterPopupComponent } from './login-register-popup.component';

describe('LoginRegisterPopupComponent', () => {
  let component: LoginRegisterPopupComponent;
  let fixture: ComponentFixture<LoginRegisterPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRegisterPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRegisterPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
