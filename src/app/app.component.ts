import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './service/posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isFetching: boolean = false;
  error: string = null;
  errorSubscription: Subscription;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.errorSubscription = this.postsService.errorSubject.subscribe((error: string) => this.error = error);
    this.fetchPosts();
  }

  ngOnDestroy(): void { this.errorSubscription.unsubscribe(); }

  onCreatePost(postData: Post): void { this.postsService.createPost(postData); }

  onFetchPosts(): void { this.fetchPosts(); }

  onClearPosts(): void { this.postsService.deletePosts().subscribe(() => this.posts = []); }

  onHandleError(): void { this.error = null; }

  private fetchPosts(): void {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(
      (posts: Post[]) => { this.isFetching = false; this.posts = posts; },
      (error: Error) => { this.isFetching = false; this.error = error.message; });
  }
}
