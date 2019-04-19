import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HEROS } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;
  heroes = HEROS;
  constructor() { }

  ngOnInit() {
  }
  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
