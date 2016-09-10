/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/profile-edit/profile-edit.html',
})
export class ProfileEditPage {

  form_profile   :any
  http           :any
  user_email     :any
  user_full_name :any
  user_id        :any
  user_name      :any
  user_pc        :any
  user_ps4       :any
  user_twitch    :any
  user_twitter   :any
  user_xbox_one  :any
  user_youtube   :any
  blog_id        :any




  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController) {

    this.form_profile = {}
    this.user_id   = navParams.get("user_id");
    this.user_name = navParams.get("user_name");
    this.blog_id = navParams.get("blog_id");
    this.http = http
    this.get_profile()


  }

  get_profile(){

    let link = 'https://gamerholic.com/server/v2/get_profile.php';
    let data_post = JSON.stringify({user_id:this.user_id});
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(link, data_post,options)
    //print php error
    //.subscribe(data => {console.log(data._body)})
     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{

        this.user_pc       = data.user_pc,
        this.user_ps4      = data.user_ps4,
        this.user_twitch   =data.user_twitch,
        this.user_twitter  = data.user_twitter,
        this.user_xbox_one = data.user_xbox_one,
        this.user_youtube  =data.user_youtube,
        console.log(JSON.stringify(data))

      }
    )


  }

  update(){

    let link = 'https://gamerholic.com/server/v2/profile_update.php';
    let data_post = JSON.stringify({
      user_id :this.user_id,
      user_name :this.form_profile.user_name,
      user_full_name :this.form_profile.user_full_name,
      user_pc  :this.form_profile.user_pc,
      user_ps4 :this.form_profile.user_ps4,
      user_twitter :this.form_profile.user_twitter,
      user_xbox_one :this.form_profile.user_xbox_one,
      user_youtube :this.form_profile.user_youtube,
      user_twitch :this.form_profile.user_twitch,
      blog_id :this.blog_id
    });
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
                subTitle: 'profile updated',
                buttons: ['OK']
              });
              alert.present();

              setTimeout(()=>{
                this.nav.pop();
              },1000)

        }else{

          let alert = this.alertCtrl.create({
                title: 'error',
                subTitle: data.message,
                buttons: ['OK']
              });
              alert.present();


        }
        console.log(JSON.stringify(data))

      }
    )

  }

  handleError(error){
          console.error(error);
          return Observable.throw(error.json().error || 'Server error');
      }

}
