import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { PlacesProvider } from '../../providers/places/places';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {

  places: any;

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translateService: TranslateService,
        private barcodeScanner: BarcodeScanner,
        public placesProvider: PlacesProvider,
        private toast: Toast
  ) {
    this.getPlaces();
  }

  scan() {
    let notFound;
    this.translateService.get(['SCAN_NOT_FOUND']).subscribe(values => {
      notFound = values['SCAN_NOT_FOUND'];
    });

    this.barcodeScanner.scan().then((qrData) => {
      let selectedPlaceId = qrData.text.split('#').shift();
      let selectedPlace = this.places.find(place => place.id === selectedPlaceId);
      if(selectedPlace !== undefined) {
        this.showDetail(selectedPlace);
      } else {
        this.toast.show(notFound, '5000', 'center');
      }
    }, (err) => {
      this.toast.show(err, '5000', 'center');
    });
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
