import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { sysOptions } from '../../components/my-header/my-header.constants';

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

  getAudio(title)
  {
    if (sysOptions.systemLanguage=='es') {
      return './assets/audios/'+title+'.mp3';
    } else {
      return './assets/audios/'+title+'-en.mp3';
    }
  }
}
