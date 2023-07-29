import { Component } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  posts: Post[] = [];

  constructor(private http: HttpClient) { }

  onCreatePost(post: Post): void {
    // Send HTTP request
    console.log(post);
  }

  onFetchPosts() {
    // Send HTTP request
  }

  onClearPosts() {
    // Send HTTP request
  }
}
