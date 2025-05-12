
import { Component, type OnInit } from "@angular/core"
import{CommonModule}  from '@angular/common';

interface Slide {
  title: string
  image: string
}

@Component({
  selector: "app-hero",
  imports:[CommonModule],
  templateUrl: "./hero.component.html",
})
export class HeroComponent implements OnInit {
  slides: Slide[] = [
    {
      title: "MOONFALL",
      image: "./assets/Group 19 (1).jpg",
    },
    {
      title: "DUNE",
      image: "./assets/original-747d9e9d9d1cbd8af7b0ef6745139462.webp",
    },
    {
      title: "INTERSTELLAR",
      image: "./assets/original-7b79d07d38d7f269dfc69ffc40fb7dbb.webp",
    },
    {
      title: "AVATAR",
      image: "./assets/7e94c932-1574-41f3-b710-72ee106a9898.jpg",
    },
  ]

  ngOnInit(): void {
    
  }
}

