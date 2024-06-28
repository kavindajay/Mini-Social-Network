import { Component, Input, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";
import { Subscription } from "rxjs";
import { PageEvent } from "@angular/material/paginator";

@Component({
    selector:'app-post-list',
    templateUrl:'./post-list.component.html',
    styleUrls:['./post-list.component.css']
})
export class PostListComponent implements OnInit{
    posts: Post[] = [];
    private postsSub: Subscription = new Subscription();
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 2;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10];
    constructor(public postService : PostsService){}

    ngOnInit(): void {
        this.isLoading = true;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.postService.getPostUpdateListener()
            .subscribe((postData : {posts: Post[], postCount: number}) => {
                this.isLoading = false;
                this.totalPosts = postData.postCount;
                this.posts = postData.posts
            });
    }

    onChangedPage(pageData: PageEvent){
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postService.getPosts(this.postsPerPage, this.currentPage);
    };

    onDelete(postId:string){
        this.postService.deletePost(postId).subscribe(() => {
            this.postService.getPosts(this.postsPerPage,this.currentPage)
        });
    }

    ngOnDestroy(){
        this.postsSub.unsubscribe();
    }
}