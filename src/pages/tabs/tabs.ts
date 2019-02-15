import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController } from 'ionic-angular';
import { sysOptions } from '../../components/my-header/my-header.constants';
import { Tab1Root } from '../pages';
import { Tab2Root } from '../pages';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root: any = Tab1Root;
  tab2Root: any = Tab2Root;

  constructor(public navCtrl: NavController, public translateService: TranslateService) {
    translateService.use(sysOptions.systemLanguage);
 }
}
