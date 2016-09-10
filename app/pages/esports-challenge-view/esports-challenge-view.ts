/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation,ImagePicker} from 'ionic-native';

@Component({
  templateUrl: 'build/pages/esports-challenge-view/esports-challenge-view.html',
})
export class EsportsChallengeViewPage {

  blog_content                    :any
  blog_title                      :any
  category                        :any
  challenge_accepted              :any
  challenge_doc                   :any
  challenge_pending               :any
  challenge_score_confirm_pending :any
  challenge_score_pending         :any
  http                            :any
  opponent_loss                   :any
  opponent_loss_streak            :any
  opponent_name                   :any
  opponent_pc                     :any
  opponent_ps4                    :any
  opponent_twitch                 :any
  opponent_twitter                :any
  opponent_wii                    :any
  opponent_win_streak             :any
  opponent_wins                   :any
  opponent_xbox_one               :any
  opponent_youtube                :any
  ops                             :any
  show_form                       :any
  tournament_console              :any
  tournament_game                 :any
  user_id                         :any
  user_name                       :any
  blog_id                         :any
  score_form                      :any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController) {


    this.challenge_accepted              = navParams.get("challenge_accepted");
    this.challenge_doc                   = navParams.get("challenge_doc");
    this.challenge_pending               = navParams.get("challenge_pending");
    this.challenge_score_confirm_pending = navParams.get("challenge_score_confirm_pending");
    this.challenge_score_pending         = navParams.get("challenge_score_pending");
    this.http                            = http
    this.opponent_loss                   = navParams.get("opponent_loss");
    this.opponent_loss_streak            = navParams.get("opponent_loss_streak");
    this.opponent_pc                     = navParams.get("opponent_pc");
    this.opponent_ps4                    = navParams.get("opponent_ps4");
    this.opponent_twitch                 = navParams.get("opponent_twitch");
    this.opponent_twitter                = navParams.get("opponent_twitter");
    this.opponent_wii                    = navParams.get("opponent_wii");
    this.opponent_win_streak             = navParams.get("opponent_win_streak");
    this.opponent_wins                   = navParams.get("opponent_wins");
    this.opponent_xbox_one               = navParams.get("opponent_xbox_one");
    this.opponent_youtube                = navParams.get("opponent_youtube");
    this.user_id                         = navParams.get("user_id");
    this.user_name                       = navParams.get("user_name");
    this.blog_id                       = navParams.get("blog_id");
    this.score_form = {}

    console.log(this.challenge_doc)
    //console.log('user id is' + this.user_id)

  }

  accept(){

    let link = 'https://gamerholic.com/server/v2/esports_challenge_accept.php';
    let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id,challenge_doc:this.challenge_doc});
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
                subTitle: 'challenge accepted, contact your opponent, play your game then come back to the site to report the score',
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

  score(){

    let link = 'https://gamerholic.com/server/v2/esports_challenge_score.php';
    let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id,challenge_doc:this.challenge_doc,player1_score:this.score_form.player1_score,player2_score:this.score_form.player2_score,winner:this.score_form.winner});
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
                subTitle: 'challenge scored, your opponent has 10 mins to confirm the score',
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

  confirm(){

    let link = 'https://gamerholic.com/server/v2/esports_challenge_score_confirm.php';
    let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id,challenge_doc:this.challenge_doc});
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
                subTitle: 'score confirmed',
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
