import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Comment } from '../../shared/comment';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

comment: FormGroup;
getcomment: Comment;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public formBuilder: FormBuilder) {

 this.comment = this.formBuilder.group({
  name: ['', Validators.required],
  rating: [3, Validators.required],
  commented: ['', Validators.required], 
  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }
 dismiss(){
	this.viewCtrl.dismiss(null);
  }
  onSubmit(){
  this.getcomment = {
  "author" : this.comment.value.name,
  "rating" : this.comment.value.rating,
  "comment" : this.comment.value.commented,
  "date" : new Date().toISOString()
  };
    console.log(this.comment.value);
	this.viewCtrl.dismiss(this.getcomment);
  }
}
