import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit{
    posts: Post[] = [];
    private postsSub: Subscription = new Subscription();

    constructor(public postService : PostsService){}

    ngOnInit(): void {
        this.posts =this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
            .subscribe((posts : Post[]) => {
                this.posts = posts;
            })
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}