import { Injectable } from '@angular/core';
import { HEROS } from './mock-heroes';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';



@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }
  getHeros(): Observable<Hero[]> {
    this.messageService.add('HeroService:fetched heroes');
    return of(HEROS);
  }
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService:fetched hero id=${id}`);
    return of(HEROS.find(hero => hero.id === id));
  }
}
