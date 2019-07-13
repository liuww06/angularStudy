import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Injectable({
  providedIn: 'root'
})
export class DebouncingService {

  private searchText$ = new Subject<string>();
  constructor(private messageservice:MessageService) { }

  public Debouncing<T>(action:(...params:any[])=>Observable<T>,caller:any){
      return this.searchText$.pipe(debounceTime(500),distinctUntilChanged(),switchMap((keywd,idx)=>{
        this.messageservice.add("switchmap:"+idx);
        return action.call(caller,keywd);
      }));
  }
  public next(vaule?:string){
    this.searchText$.next(vaule);
  }
}
