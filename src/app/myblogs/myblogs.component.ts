import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthService } from '../auth.service';
import 'firebase/firestore';
@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit{
  user: any = {};
  posts: any[] = [];

  constructor() {
    // firebase.firestore().settings({
    //   timestampsInSnapshots: true
    // });
    this.user = firebase.auth().currentUser;
    console.log(this.user)
    this.getPosts();
  }

  ngOnInit() {
  }

  getPosts(){
    // get the list of posts

    firebase.firestore().collection("posts")
    .orderBy("created", "desc")
    .limit(100)
    .get().then((querySnapshot) => {

      console.log(querySnapshot.docs);
      this.posts = querySnapshot.docs;

    }).catch((err) => {
      console.log(err);
    })

  }

  onPostCreated(){
    // refresh the list of posts
    this.posts = [];
    this.getPosts();

  }

  onDelete(){
    // refresh the list of posts
    this.posts = [];
    this.getPosts();
  }

}