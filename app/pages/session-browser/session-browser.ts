/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation} from 'ionic-native';
import {DashboardPage} from '../dashboard/dashboard'
import {HomePage} from '../home/home'

@Component({
  templateUrl: 'build/pages/session-browser/session-browser.html',
})
export class SessionBrowserPage {

  data          :any
  data_post     :any
  form_login    :any
  form_register :any
  form_reset    :any
  http          :any
  uid           :any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController) {

    this.data          = {}
    this.form_login    = {}
    this.form_register = {}
    this.form_reset    = {}
    this.http          = http

  }

  register(){

    let pass = 1
    if(!this.form_register.user_name){

      pass = 0
      let alert = this.alertCtrl.create({
            title: '<div class="text-center">error</div>',
            subTitle: '<div class="text-center">enter a gamer name</div>',
            buttons: ['OK']
          });
          alert.present();
    }
    if(!this.form_register.user_email && pass>0){
      pass = 0
      let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: 'enter your email',
            buttons: ['OK']
          });
          alert.present();
    }
    if(!this.form_register.user_password && pass>0){
      pass = 0
      let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: 'enter your password',
            buttons: ['OK']
          });
          alert.present();
    }
    if(pass>0){

      let link = 'https://gamerholic.com/server/v2/session_register_browser.php';
      let data_post = JSON.stringify({user_name:this.form_register.user_name,user_email:this.form_register.user_email,password:this.form_register.user_password});
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
                  subTitle: 'you are logged in, confirm your email to generate a Gamerholic coin wallet.',
                  buttons: ['OK']
                });
            alert.present();
            localStorage.setItem('gamerholic_user_id',data.user_id)
            localStorage.setItem('gamerholic_user_name',data.user_name)

            setTimeout(()=>{

              this.nav.pop();

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
      )
    }
  }

  login(){

    let pass = 1
    if(!this.form_login.user_name){

      pass = 0
      let alert = this.alertCtrl.create({
            title: '<div class="text-center">error</div>',
            subTitle: '<div class="text-center">enter a gamer name</div>',
            buttons: ['OK']
          });
          alert.present();
    }
    if(!this.form_login.user_password && pass>0){
      pass = 0
      let alert = this.alertCtrl.create({
            title: 'error',
            subTitle: 'enter your password',
            buttons: ['OK']
          });
          alert.present();
    }
    if(pass>0){

      var link = 'https://gamerholic.com/server/v2/session_login_browser.php';
      var data_post = JSON.stringify({user_name:this.form_login.user_name,password:this.form_login.user_password});
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
                  subTitle: 'logging you in',
                  buttons: ['OK']
                });
            alert.present();
            localStorage.setItem('gamerholic_user_id',data.user_id)
            localStorage.setItem('gamerholic_user_name',data.user_name)

            setTimeout(()=>{

              this.nav.pop();

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
      )
    }
  }

  reset(){

    let pass = 1
    if(!this.form_reset.user_email){

      pass = 0
      let alert = this.alertCtrl.create({
            title: '<div class="text-center">error</div>',
            subTitle: '<div class="text-center">enter your email</div>',
            buttons: ['OK']
          });
          alert.present();
    }
    if(pass>0){

    }
  }

  handleError(error){
          console.error(error);
          return Observable.throw(error.json().error || 'Server error');
      }

}
