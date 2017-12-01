import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html'
})
export class ScanPage {

  constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public translateService: TranslateService,
        private barcodeScanner: BarcodeScanner,
        private toast: Toast
) {

  }

  scan() {
 // this.selectedProduct = {};
  this.barcodeScanner.scan().then((qrData) => {
      this.toast.show(qrData.text, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );

    /*this.selectedProduct = this.products.find(product => product.plu === qrData.text);
    if(this.selectedProduct !== undefined) {
      this.productFound = true;
    } else {
      this.productFound = false;
      this.toast.show(`Product not found`, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
  }*/
  }, (err) => {
    this.toast.show(err, '5000', 'center').subscribe(
      toast => {
        console.log(toast);
      }
    );
  });
}
}
