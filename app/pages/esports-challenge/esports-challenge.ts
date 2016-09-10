/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation,ImagePicker} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/esports-challenge/esports-challenge.html',
})
export class EsportsChallengePage {

  blog_content       :any
  blog_title         :any
  category           :any
  challenge_stream   :any
  challenge_twitch   :any
  challenge_youtube  :any
  http               :any
  opponent_id        :any
  opponent_name      :any
  ops                :any
  show_form          :any
  tournament_console :any
  tournament_game    :any
  user_id            :any
  user_name          :any
  user_twitch        :any
  user_youtube       :any
  challenge_form :any
  blog_id :any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController) {

    this.http          = http
    this.opponent_id   = navParams.get("opponent_id");
    this.opponent_name = navParams.get("opponent_name");
    this.user_id       = navParams.get("user_id");
    this.blog_id       = navParams.get("blog_id");
    this.user_name     = navParams.get("user_name");
    this.challenge_form = {}
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

        this.user_twitch   =data.user_twitch,
        this.user_youtube  = data.user_youtube
      }
    )
  }

  challenge(opponent_id,opponent_name){

    let link = 'https://gamerholic.com/server/v2/esports_challenge.php';
    let data_post = JSON.stringify({user_id:this.user_id,opponent_id:this.opponent_id,opponent_name:this.opponent_name,challenge_stream:this.challenge_form.stream,challenge_youtube:this.challenge_form.youtube,challenge_twitch:this.challenge_form.twitch,blog_id:this.blog_id});
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
                subTitle: 'challenge sent',
                buttons: [{
                  text: 'okay',
                  handler: data => {
                      setTimeout(()=>{
                        this.nav.pop()
                      },1000)
                    }
                }]
              });
              alert.present();

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
