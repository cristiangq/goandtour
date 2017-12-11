import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PlacesProvider } from '../../providers/places/places';
import { sysOptions } from '../../components/my-header/my-header.constants';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  places: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService,
      public placesProvider: PlacesProvider
  ) {
      this.getPlaces();
  }

  getTitle(item) {
    return item.langs[sysOptions.systemLanguage].title;
  }

  showDetail(item) {
      this.navCtrl.push('DetailPage', {
        item: item
      });
  }

  getPlaces() {
    this.placesProvider.getAll()
    .then(data => {
      this.places = data;
    });
  }

}
