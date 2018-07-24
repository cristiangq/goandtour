import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { sysOptions } from '../../components/my-header/my-header.constants';
import { PlacesProvider } from '../../providers/places/places';

import { LaunchNavigator } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  @ViewChild(Content) content: Content;

  item: any;
  allItems: any;
  placeImages: string[];

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService,
      private launchNavigator: LaunchNavigator,
      public placesProvider: PlacesProvider
  ) {
      this.initializeItems();
      this.item = navParams.get('item');
      this.placeImages = this.item.multimedia;
  }

  initializeItems() {
    this.placesProvider.getAll()
    .then(data => {
      this.allItems = data;
    });
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

  hasPrev()
  {
    let key = parseInt(this.item.id) - 1;
    return this.allItems && this.allItems.find(function (obj) { return obj.id == key; });
  }

  hasNext()
  {
    let key = parseInt(this.item.id) + 1;
    return this.allItems && this.allItems.find(function (obj) { return obj.id == key; });
  }

  prev()
  {
    this.navCtrl.push('DetailPage', {
      item: this.allItems[this.item.id-1]
    });
  }

  next()
  {
    this.navCtrl.push('DetailPage', {
      item: this.allItems[this.item.id+1]
    });
  }
}
