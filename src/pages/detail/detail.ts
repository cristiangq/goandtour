import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { sysOptions } from '../../components/my-header/my-header.constants';


@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService
  ) {
      this.item = navParams.get('item');
  }

  getTitle(item) {
    return this.item.langs[sysOptions.systemLanguage].title;
  }

  getDescription()
  {
      return this.item.langs[sysOptions.systemLanguage].description;
  }
}
