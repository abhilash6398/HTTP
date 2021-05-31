import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Subject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Post } from './post.model';

@Injectable({providedIn:'root'})
export class PostsService {
  error= new Subject<string>();

  constructor(private http: HttpClient){}

  createAndStorePost(title: string, content: string){
    //...http request will be sent here
    const postData: Post={title: title, content: content}
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-6805f-default-rtdb.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      },
      error=>{
        this.error.next(error.message);
      });
  }

  fetchPosts(){
    //...
    let searchParams= new HttpParams();
    searchParams = searchParams.append('print','pretty'),
    searchParams = searchParams.append('custom','key');
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-6805f-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({"Customer-Headers": "Hello"}),
          params: new HttpParams().set('print','pretty')
        }
      )
      .pipe(
        map(responseData => {
          const postsArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postsArray.push({ ...responseData[key], id: key });
            }
          }
          return postsArray;
        }),
        catchError(errorRes=>{
          return throwError(errorRes);

        })
      );
      // .subscribe(posts => {
      //   this.loadedPosts=posts;
      // });



  }

  deletePosts(){
    return this.http.delete('https://ng-complete-guide-6805f-default-rtdb.firebaseio.com/posts.json');
  }
}
