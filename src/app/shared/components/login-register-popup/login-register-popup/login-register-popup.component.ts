import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-register-popup',
  imports: [CommonModule],
  templateUrl: './login-register-popup.component.html',
  styleUrl: './login-register-popup.component.css'
})
export class LoginRegisterPopupComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) {}
  closeModal(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
  onBackdropClick(event: MouseEvent): void {
    this.closeModal();
  }
  onLoginClick(): void {
    this.router.navigate(['/login']);
    this.closeModal();
  }
  onRegisterClick(): void {
    this.router.navigate(['/register']);
    this.closeModal();
  }
}
