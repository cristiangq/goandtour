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
  placeImages: string[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService
  ) {
      this.item = navParams.get('item');
      this.placeImages = this.item.multimedia;
  }

  getTitle() {
    return this.item.langs[sysOptions.systemLanguage].title;
  }

  getDescription()
  {
      return this.item.langs[sysOptions.systemLanguage].description;
  }
}
