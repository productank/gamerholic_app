/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation,ImagePicker} from 'ionic-native';
import {SessionMobilePage} from '../session-mobile/session-mobile';
import {SessionBrowserPage} from '../session-browser/session-browser';
import {ProfileEditPage} from '../profile-edit/profile-edit';
import {BlogPage} from '../blog/blog';
import { FroalaEditorDirective, FroalaViewDirective } from '../lib/froala.directives';
import { bootstrap }    from '@angular/platform-browser-dynamic';

@Page({
  templateUrl: 'build/pages/blog-add/blog-add.html',
  directives: [FroalaEditorDirective, FroalaViewDirective]
})
export class BlogAddPage {

  blog_content       :any
  blog_title         :any
  category           :any
  http               :any
  ops                :any
  show_form          :any
  tournament_console :any
  tournament_game    :any
  user_id            :any
  user_name          :any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController) {

    this.user_id   = navParams.get("user_id");
    this.user_name = navParams.get("user_name");
    this.http = http

  }

  category_set(value){
    this.category = value
    this.show_form = 1
  }

  public options: Object = {
     placeholderText: 'Edit Your Content Here!',
     charCounterCount: true,
     toolbarInline: false,
     alignApply: 'left',
     events: {
       'froalaEditor.initialized': function() {
         console.log('initialized');
       }
     }
   }

   submit(){

     var link = 'https://gamerholic.com/server/v2/blog_add.php';
     var data_post = JSON.stringify({user_id:this.user_id,blog_title:this.blog_title,blog_content:this.blog_content,blog_category:this.category,tournament_console:this.tournament_console,tournament_game:this.tournament_game});
     let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
     let options = new RequestOptions({ headers: headers });
     return this.http.post(link, data_post,options)
     //print php error
     //.subscribe(data => {console.log(data._body)})
      //get json response
       .map(data => data.json())
       .catch(this.handleError)
       .subscribe((data) =>{
         if(data.success){

           let alert = this.alertCtrl.create({
                 title: 'success',
                 subTitle: 'content posted',
                 buttons: ['OK']
               });
           alert.present();

           setTimeout(()=>{

             this.nav.push(BlogPage,{
               blog_content:this.blog_content,
               blog_id     :data.blog_id,
               blog_title  :this.blog_title,
               user_id     :this.user_id,
               user_name   :this.user_name
             });

           },2000)

         }else{
           let alert = this.alertCtrl.create({
                 title: 'error',
                 subTitle: data.message,
                 buttons: ['OK']
               });
               alert.present();

         }
       })
   }

   handleError(error){
           console.error(error);
           return Observable.throw(error.json().error || 'Server error');
       }

}
