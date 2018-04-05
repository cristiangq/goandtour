import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { sysOptions } from '../../components/my-header/my-header.constants';

import { LaunchNavigator } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  @ViewChild(Content) content: Content;

  item: any;
  placeImages: string[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService,
      private launchNavigator: LaunchNavigator
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

  getAudio()
  {
    return this.item.langs[sysOptions.systemLanguage].audio;
  }

  goMap(coords) {
    this.launchNavigator.navigate([this.item.latitude, this.item.longitude]);
  }
}
