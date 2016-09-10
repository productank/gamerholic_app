/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation} from 'ionic-native';
import {SessionMobilePage} from '../session-mobile/session-mobile';
import {SessionBrowserPage} from '../session-browser/session-browser';
import {BlogAddPage} from '../blog-add/blog-add';
import {BlogPage} from '../blog/blog';
import {TruncatePipe} from '../lib/truncate';
import { TSMT$NumberFormatter   } from '../lib/NumberFormatter';
import {ScientificNotationPipe} from '../lib/ScientificNotationPipe';

@Component({
  pipes: [TruncatePipe,ScientificNotationPipe],
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {

  device                      :any
  GHC_Ask                     :any
  GHC_Bid                     :any
  GHC_data                    :any
  GHC_High                    :any
  GHC_Low                     :any
  GHC_OpenBuyOrders           :any
  GHC_OpenSellOrders          :any
  GHC_Volume                  :any
  http                        :any
  message                     :any
  platform_ghc                :any
  platform_ghc_price          :any
  platform_ghc_price_dollars  :any
  platform_reward_ghc         :any
  platform_reward_ghc_dollars :any
  session                     :any
  user_address                :any
  user_city                   :any
  user_country                :any
  user_county                 :any
  user_ghc_balance            :any
  user_ghc_balance_dollars    :any
  user_ghc_cold_reserves      :any
  user_ghc_hot_reserves       :any
  user_id                     :any
  user_lat                    :any
  user_lng                    :any
  user_name                   :any
  user_power_level            :any
  user_state                  :any
  user_zip                    :any
  wallet_data                 :any
  wallet_timer                :any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController) {


   this.device        = Device.device.uuid;
   this.http          = http;
   this.platform      = platform;
   this.session       = null
   this.user_id       = localStorage.getItem('gamerholic_user_id')
   this.user_name     = localStorage.getItem('gamerholic_user_name')
   this.zone          = zone;

   setInterval(()=>{
     this.start()
   },1000)

   window.onbeforeunload = function(e) {
     //localStorage.clear();

   };
   this.get_wallet()

  }

  start(){

    let u = localStorage.getItem('gamerholic_user_id')
    let g = localStorage.getItem('gamerholic_user_name')
    if(u){
      this.user_id = u
      this.session = 1
    }else{
      this.user_id = 0
      this.session = 0
    }
    if(g){
      this.user_name = g
    }
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


        this.GHC_Ask                    = data.result[0].Ask;
        this.GHC_Bid                    = data.result[0].Bid;
        this.GHC_High                   = data.result[0].High;
        this.GHC_Low                    = data.result[0].Low;
        this.GHC_OpenBuyOrders          = data.result[0].OpenBuyOrders;
        this.GHC_OpenSellOrders         = data.result[0].OpenSellOrders;
        this.GHC_Volume                 = data.result[0].Volume;
        this.platform_ghc_price         = data.platform_ghc_price,
        this.platform_ghc_price_dollars = data.platform_ghc_price_dollars,
        this.user_ghc_balance           = data.user_ghc_balance,
        this.user_ghc_balance_dollars   = data.user_ghc_balance_dollars,
        this.user_ghc_cold_reserves     = data.user_ghc_cold_reserves_total,
        this.user_ghc_hot_reserves      = data.user_ghc_hot_reserves_total,
        this.user_power_level           = data.user_power_level,
        this.wallet_data                = data

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

            this.GHC_Ask                    = data.result[0].Ask;
            this.GHC_Bid                    = data.result[0].Bid;
            this.GHC_High                   = data.result[0].High;
            this.GHC_Low                    = data.result[0].Low;
            this.GHC_OpenBuyOrders          = data.result[0].OpenBuyOrders;
            this.GHC_OpenSellOrders         = data.result[0].OpenSellOrders;
            this.GHC_Volume                 = data.result[0].Volume;
            this.platform_ghc_price         = data.platform_ghc_price,
            this.platform_ghc_price_dollars = data.platform_ghc_price_dollars,
            this.user_ghc_balance           = data.user_ghc_balance,
            this.user_ghc_balance_dollars   = data.user_ghc_balance_dollars,
            this.user_ghc_cold_reserves     = data.user_ghc_cold_reserves_total,
            this.user_ghc_hot_reserves      = data.user_ghc_hot_reserves_total,
            this.user_power_level           = data.user_power_level,
            this.wallet_data                = data
            //console.log(JSON.stringify(data))
          }
        )
          //
      },15000)
    })
  }

  login(){

    if(this.platform.is('core')){

      this.nav.push(SessionBrowserPage);

    }else{

      this.nav.push(SessionMobilePage);

    }
  }

  ionViewDidEnter(){
      this.get_wallet()
  }

  ionViewDidLeave() {

    clearInterval(this.wallet_timer);

  }
logout(){

  localStorage.clear();

}

  handleError(error){
          console.error(error);
          return Observable.throw(error.json().error || 'Server error');
      }


}
