import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  imports: [RouterLink,RouterLinkActive],

  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {}
