import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Subject, Observable } from 'rxjs';
import {  distinctUntilChanged, debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private userService:UserService,private messageService: MessageService) { }

  users:User;
  error:string;
  status:any;
  private searchText$ = new Subject<string>();
  private observableUser:Observable<User>;

  ngOnInit() {
    this.userService.getUser(2).subscribe(user=>this.users=user,err=>{
      this.messageService.add((<HttpErrorResponse>err).message);
    });
    this.searchText$.pipe(debounceTime(500),distinctUntilChanged(),switchMap((keywd,idx)=>{
      this.messageService.add("switchmap:"+idx);
      return this.userService.Search(keywd);
    })).subscribe(u=>{
      this.users={...u};
      this.messageService.add('Execute search()');
    });
  }

  search(keywords:string){
    this.searchText$.next(keywords);
    // this.observableUser.subscribe(u=>{
    //   this.users={...u};
    //   this.messageService.add('Execute search()');
    // });
  }
  
}
