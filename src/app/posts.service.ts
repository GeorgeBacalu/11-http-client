import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient, HttpEventType, HttpHeaders, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable, Subject, catchError, map, tap, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsService {
  url: string = "https://ng-http-demo-615cb-default-rtdb.firebaseio.com/posts.json";
  errorSubject = new Subject<string>();

  constructor(private http: HttpClient) { }

  createPost(postData: Post): void {
    this.http.post<{name: string}>(this.url, postData, { observe: "response" }).subscribe(
      (response: HttpResponseBase) => console.log(response), 
      (error: Error) => this.errorSubject.next(error.message));
  }

  fetchPosts(): Observable<Post[]> {
    let params: HttpParams = new HttpParams();
    params = params.append("print", "pretty");
    params = params.append("custom", "key");
    return this.http.get<{[key: string]: Post}>(this.url, { headers: new HttpHeaders({ "Content-Type": "application/json" }), params })
    .pipe(map(data => {
      const posts: Post[] = [];
      for(const key in data) {
        if(data.hasOwnProperty(key)) posts.push({ ...data[key], id: key });
      }
      return posts;
    }), catchError(error => throwError(error)));
  }

  deletePosts(): Observable<any> {
    return this.http.delete(this.url, { observe: "events", responseType: "text" }).pipe(tap(event => {
      console.log(event);
      if(event.type === HttpEventType.Response) console.log(event.body);
    }));
  }
}
