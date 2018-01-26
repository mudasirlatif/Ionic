import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { CommentPage } from '../comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
 
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;
  comment: Comment;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  @Inject('BaseURL') private BaseURL, 
  private favoriteservice: FavoriteProvider, public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public modalCtrl: ModalController) {
    this.dish = navParams.get('dish');
    this.favorite = this.favoriteservice.isFavorite(this.dish.id); 
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comments => total += comments.rating);
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  
 addToFavorites()
 {
 console.log('Adding to favorites', this.dish.id);
 this.favorite = this.favoriteservice.addFavorite(this.dish.id);
 this.toastCtrl.create({
        message: 'Dish ' + this.dish.id + ' added as a favorite successfully', 
        position: 'middle',
        duration: 3000
  }).present();
 }
 presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Select Actions',
     buttons: [
       {
         text: 'Add to Favorites',
         handler: () => {
          this.addToFavorites();
         }
       },
       {
         text: 'Add a Comment',
         handler: () => {
           this.CommentPage();
         }
       },
      {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
     ]
   });

   actionSheet.present();
 }
 
  CommentPage()
  {
  let commentModal = this.modalCtrl.create(CommentPage);
 commentModal.present();
  commentModal.onDidDismiss(comment => {
   this.dish.comments.push(comment); 
  });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }
}
