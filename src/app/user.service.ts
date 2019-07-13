import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user';
import { throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url='http://localhost:19092/api/User/';
  constructor(private httpClient:HttpClient,private messageService: MessageService) { }

  public Search(keywords:string){
    return this.httpClient.get<User>(this.url+'Search/'+keywords).pipe(tap(data=>this.messageService.add('UserService.Search')))
  }

  public getUser(id:number){
    return this.httpClient.get<User>(this.url+id).pipe(tap(data=>this.messageService.add(data.toString())))
  }

  public getUsers()
  {
    return this.httpClient.get<User>(this.url).pipe(retry(3),catchError(this.handleError));
  }

  public getUserStr(){
    return this.httpClient.get(this.url,{responseType:'text'}).pipe(tap(data=>this.messageService.add(data)));
  }


  public getUserResp()
  {
    return this.httpClient.get<User>(this.url,{observe:'response'});
  }

  private handleError(error:HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.error('An Error occured:',error.error.message);
    }else{
      console.error(
        `Backend returned code ${error.status},`+
        `body was:${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  private log(msg:String){
    console.info(msg);
  }
}
