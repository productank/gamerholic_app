/// <reference path="../../../typings/index.d.ts" />
import {Component,NgZone,ChangeDetectionStrategy,Injectable} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,Page,Alert,Tabs,AlertController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Device,Toast,Geolocation,ImagePicker} from 'ionic-native';
import { SafeResourceUrl, DomSanitizationService } from '@angular/platform-browser';

@Component({
  templateUrl: 'build/pages/arcade/arcade.html',
})
export class ArcadePage {

  game_url  :any
  http      :any
  user_id   :any
  user_name :any

  constructor(private nav: NavController, navParams : NavParams,private platform: Platform, http: Http, public zone:NgZone,public viewCtrl: ViewController,public alertCtrl: AlertController,sanitizer: DomSanitizationService) {

    this.game_url  = sanitizer.bypassSecurityTrustResourceUrl('http://plnkr.co');
    this.http      = http
    this.user_id   = navParams.get("user_id");
    this.user_name = navParams.get("user_name");

  }

}
