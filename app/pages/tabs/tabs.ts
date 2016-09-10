import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {ArcadePage} from '../arcade/arcade';
import {EsportsPage} from '../esports/esports';
import {ShopPage} from '../shop/shop';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HomePage;
    this.tab2Root = ArcadePage;
    this.tab3Root = EsportsPage;
    this.tab4Root = ShopPage;
  }
}
