import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { PlacesProvider } from '../../providers/places/places';
import { sysOptions } from '../../components/my-header/my-header.constants';
import 'rxjs/add/operator/debounceTime';
import { FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  allItems: any;
  items: any;
  searchControl: FormControl;
  searching: any = false;
  searchTerm: string = '';

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService,
      public placesProvider: PlacesProvider
  ) {
    this.searchControl = new FormControl();
    this.initializeItems();
  }

  ionViewDidLoad() {
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.searching = false;
      this.setFilteredItems();
    });
  }

  getTitle(item) {
    return item.langs[sysOptions.systemLanguage].title;
  }

  showAddress(item) {
    const title = item.langs[sysOptions.systemLanguage].title;
    return title.length < 27;
  }

  showDetail(item) {
      this.navCtrl.push('DetailPage', {
        item: item
      });
  }

  initializeItems() {
    this.placesProvider.getAll()
    .then(data => {
      this.allItems = data;
      this.setFilteredItems();
    });
  }

  onSearchInput(){
    this.searching = true;
  }

  setFilteredItems() {
    this.items = this.allItems;
    this.items = this.items.filter((item) => {
      return (item.langs[sysOptions.systemLanguage].title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1);
    });
  }

}
