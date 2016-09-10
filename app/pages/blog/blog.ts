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
import { FroalaEditorDirective, FroalaViewDirective } from '../lib/froala.directives';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import {ProfileEditPage} from '../profile-edit/profile-edit';
import {EsportsChallengePage} from '../esports-challenge/esports-challenge';
import {EsportsChallengeViewPage} from '../esports-challenge-view/esports-challenge-view';

@Page({
  templateUrl: 'build/pages/blog/blog.html',
  directives: [FroalaEditorDirective, FroalaViewDirective]

})
export class BlogPage {

  blog_category                   :any
  blog_content                    :any
  blog_data                       :any
  blog_earnings_dollar            :any
  blog_earnings_ghc               :any
  blog_id                         :any
  blog_image                      :any
  blog_timer                      :any
  blog_title                      :any
  blogs_count                     :any
  category                        :any
  challenge_accepted              :any
  challenge_doc                   :any
  challenge_pending               :any
  challenge_score_confirm_pending :any
  challenge_score_pending         :any
  data                            :any
  http                            :any
  message_join                    :any
  message_type                    :any
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
  platform_ghc                    :any
  platform_ghc_price              :any
  platform_ghc_price_dollars      :any
  platform_reward_ghc             :any
  platform_reward_ghc_dollars     :any
  players_timer                   :any
  show_form                       :any
  tournament_play_id              :any
  tournament_player_data          :any
  user_ghc_balance                :any
  user_ghc_balance_dollars        :any
  user_ghc_cold_reserves          :any
  user_ghc_hot_reserves           :any
  user_id                         :any
  user_in_tournament              :any
  user_name                       :any
  user_power_level                :any
  wallet_data                     :any
  wallet_timer                    :any


  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController) {

    this.blog_category                   = navParams.get("blog_category");
    this.blog_content                    = navParams.get("blog_content");
    this.blog_id                         = navParams.get("blog_id");
    this.blog_image                      = navParams.get("blog_image");
    this.blog_title                      = navParams.get("blog_title");
    this.challenge_accepted              = 0
    this.challenge_pending               = 0
    this.challenge_score_confirm_pending = 0
    this.challenge_score_pending         = 0
    this.http                            = http
    this.tournament_player_data          = {}
    this.user_id                         = navParams.get("user_id");
    this.user_name                       = navParams.get("user_name");
    this.get_blogs();
    this.get_wallet()
    this.get_tournament_players()
    //console.log(this.blog_category)

  }

  get_blogs(){

    let link = 'https://gamerholic.com/server/v2/get_blogs.php';
    let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id});
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(link, data_post,options)
    //print php error
    //.subscribe(data => {console.log(data._body)})
     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{

        this.blog_earnings_ghc           = data.blog_earnings_ghc,
        this.blog_earnings_dollar        = data.blog_earnings_dollar,
        this.platform_ghc_price          = data.platform_ghc_price,
        this.platform_ghc_price_dollars  = data.platform_ghc_price_dollars,
        this.platform_reward_ghc         = data.platform_reward_ghc,
        this.platform_reward_ghc_dollars = data.platform_reward_ghc_dollars
        //console.log(JSON.stringify(data))

      }
    ),

    this.zone.run(()=>{
     this.blog_timer = setInterval(()=>{

        let link = 'https://gamerholic.com/server/v2/get_blogs.php';
        let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id});
        let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(link, data_post,options)
        //print php error
        //.subscribe(data => {console.log(data._body)})
         //get json response
          .map(data => data.json())
          .catch(this.handleError)
          .subscribe((data) =>{

            this.blog_earnings_ghc           = data.blog_earnings_ghc,
            this.blog_earnings_dollar        = data.blog_earnings_dollar,
            this.platform_ghc_price          = data.platform_ghc_price,
            this.platform_ghc_price_dollars  = data.platform_ghc_price_dollars,
            this.platform_reward_ghc         = data.platform_reward_ghc,
            this.platform_reward_ghc_dollars = data.platform_reward_ghc_dollars
            //console.log(JSON.stringify(data))
          }
        )
          //
      },15000)
    })
  }

  vote(){

    var link = 'https://gamerholic.com/server/v2/blog_vote.php';
    var data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id});
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
                subTitle: 'vote added, you powered up',
                buttons: ['OK']
              });
          alert.present();
          this.get_blogs()
          this.get_wallet()
        }else{

          let alert = this.alertCtrl.create({
                title: 'error',
                subTitle: data.message,
                buttons: ['OK']
              });
              alert.present();

        }
        //console.log(JSON.stringify(data))
      })
  }
  get_wallet(){

    let link = 'https://gamerholic.com/server/v2/get_wallet.php';
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

        this.user_ghc_balance         = data.user_ghc_balance,
        this.user_ghc_balance_dollars = data.user_ghc_balance_dollars,
        this.user_ghc_cold_reserves   = data.user_ghc_cold_reserves_total,
        this.user_ghc_hot_reserves    = data.user_ghc_hot_reserves_total,
        this.user_power_level         = data.user_power_level,
        this.wallet_data              = data
        //console.log(JSON.stringify(data))
      }
    ),

    this.zone.run(()=>{
     this.wallet_timer = setInterval(()=>{

        let link = 'https://gamerholic.com/server/v2/get_wallet.php';
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

            this.user_ghc_balance         = data.user_ghc_balance,
            this.user_ghc_balance_dollars = data.user_ghc_balance_dollars,
            this.user_ghc_cold_reserves   = data.user_ghc_cold_reserves_total,
            this.user_ghc_hot_reserves    = data.user_ghc_hot_reserves_total,
            this.user_power_level         = data.user_power_level,
            this.wallet_data              = data
            //console.log(JSON.stringify(data))
          }
        )
          //
      },45000)
    })
  }

  get_tournament_players(){

    let link = 'https://gamerholic.com/server/v2/get_tournament_players.php';
    let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id});
    let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(link, data_post,options)
    //print php error
    //.subscribe(data => {console.log(data._body)})
     //get json response
      .map(data => data.json())
      .catch(this.handleError)
      .subscribe((data) =>{
        this.tournament_player_data    = data,
        this.challenge_accepted              = data.challenge_accepted,
        this.challenge_doc                   = data.challenge_doc,
        this.challenge_pending               = data.challenge_pending,
        this.challenge_score_confirm_pending = data.challenge_score_confirm_pending,
        this.challenge_score_pending         = data.challenge_score_pending,
        this.opponent_loss                   = data.opponent_loss,
        this.opponent_loss_streak            = data.opponent_loss_streak,
        this.opponent_name                   = data.opponent_name,
        this.opponent_pc                     = data.opponent_pc,
        this.opponent_ps4                    = data.opponent_ps4,
        this.opponent_twitch                 = data.opponent_twitch,
        this.opponent_twitter                = data.opponent_twitter,
        this.opponent_wii                    = data.opponent_wii,
        this.opponent_win_streak             = data.opponent_win_streak,
        this.opponent_wins                   = data.opponent_wins,
        this.opponent_xbox_one               = data.opponent_xbox_one,
        this.opponent_youtube                = data.opponent_youtube,
        this.tournament_play_id              = data.tournament_play_id,
        this.user_in_tournament              = data.user_in_tournament
        //console.log(JSON.stringify(data.challenge_doc))
      }
    ),

    this.zone.run(()=>{
     this.players_timer = setInterval(()=>{
       let link = 'https://gamerholic.com/server/v2/get_tournament_players.php';
       let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id});
       let headers = new Headers({ 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8' });
       let options = new RequestOptions({ headers: headers });
       return this.http.post(link, data_post,options)
       //print php error
       //.subscribe(data => {console.log(data._body)})
        //get json response
         .map(data => data.json())
         .catch(this.handleError)
         .subscribe((data) =>{
           this.tournament_player_data    = data,
           this.challenge_accepted              = data.challenge_accepted,
           this.challenge_doc                   = data.challenge_doc,
           this.challenge_pending               = data.challenge_pending,
           this.challenge_score_confirm_pending = data.challenge_score_confirm_pending,
           this.challenge_score_pending         = data.challenge_score_pending,
           this.opponent_loss                   = data.opponent_loss,
           this.opponent_loss_streak            = data.opponent_loss_streak,
           this.opponent_name                   = data.opponent_name,
           this.opponent_pc                     = data.opponent_pc,
           this.opponent_ps4                    = data.opponent_ps4,
           this.opponent_twitch                 = data.opponent_twitch,
           this.opponent_twitter                = data.opponent_twitter,
           this.opponent_wii                    = data.opponent_wii,
           this.opponent_win_streak             = data.opponent_win_streak,
           this.opponent_wins                   = data.opponent_wins,
           this.opponent_xbox_one               = data.opponent_xbox_one,
           this.opponent_youtube                = data.opponent_youtube,
           this.tournament_play_id              = data.tournament_play_id,
           this.user_in_tournament              = data.user_in_tournament
         }
       )
     },15000)
   })


  }
  tournament_join(){

    let link = 'https://gamerholic.com/server/v2/tournament_join.php';
    let data_post = JSON.stringify({user_id:this.user_id,blog_id:this.blog_id});
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
                subTitle: data.message,
                buttons: ['OK']
              });
          alert.present();
          this.get_tournament_players()

        }else{
          this.message_type    = data.message_type
          if(this.message_type==1){
            let alert = this.alertCtrl.create({
                  title: 'error',
                  subTitle: data.message,
                  buttons: ['OK']
                });
            alert.present();

            setTimeout(()=>{
              this.nav.push(ProfileEditPage,{
                user_id:this.user_id,
                user_name:this.user_name,
                blog_id:this.blog_id
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


        }
        //console.log(JSON.stringify(data))
      }
    )


  }

  challenge(opponent_name,opponent_id){

    this.nav.push(EsportsChallengePage,{
      opponent_name: opponent_name,
      opponent_id : opponent_id,
      user_id :this.user_id,
      user_name :this.user_name,
      blog_id :this.blog_id
    })
  }

   view(){
    this.nav.push(EsportsChallengeViewPage,{

      challenge_accepted              :this.challenge_accepted,
      challenge_doc                   :this.challenge_doc,
      challenge_pending               :this.challenge_pending,
      challenge_score_confirm_pending :this.challenge_score_confirm_pending,
      challenge_score_pending         :this.challenge_score_pending,
      opponent_loss                   :this.opponent_loss,
      opponent_loss_streak            :this.opponent_loss_streak,
      opponent_name                   :this.opponent_name,
      opponent_pc                     :this.opponent_pc,
      opponent_ps4                    :this.opponent_ps4,
      opponent_twitch                 :this.opponent_twitch,
      opponent_twitter                :this.opponent_twitter,
      opponent_wii                    :this.opponent_wii,
      opponent_win_streak             :this.opponent_win_streak,
      opponent_xbox_one               :this.opponent_xbox_one,
      opponent_youtube                :this.opponent_youtube,
      opponnet_wins                   :this.opponent_wins,
      user_id                         :this.user_id,
      user_name                       :this.user_name,
      blog_id                         :this.blog_id

    })

  }

  ionViewDidLeave() {

    clearInterval(this.wallet_timer);
    clearInterval(this.blog_timer);

  }


  handleError(error){
          console.error(error);
          return Observable.throw(error.json().error || 'Server error');
      }

}
