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
    isLoading = false;

    constructor(public postService : PostsService){}

    ngOnInit(): void {
        this.isLoading = true;
        this.postService.getPosts();
        this.postsSub = this.postService.getPostUpdateListener()
            .subscribe((posts : Post[]) => {
                this.isLoading = false;
                this.posts = posts;
            })
    }

    onDelete(postId:string){
        this.postService.deletePost(postId);
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}