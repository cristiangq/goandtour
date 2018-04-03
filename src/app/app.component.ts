import { Component } from '@angular/core';
import { Platform, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';
import { defaultLanguage, availableLanguages, sysOptions } from '../components/my-header/my-header.constants';

import { FirstRunPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FirstRunPage;

  constructor(
      platform: Platform,
      statusBar: StatusBar,
      splashScreen: SplashScreen,
      private config: Config,
      private translate: TranslateService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.translate.use(sysOptions.systemLanguage);
    });
    this.initTranslate();
  }

  initTranslate() {
    // force load all languajes
    for (let k in availableLanguages) {
      this.translate.use(availableLanguages[k].code);
    }

    if (this.translate.getBrowserLang() !== undefined) {
      var language = this.getSuitableLanguage(this.translate.getBrowserLang());
      sysOptions.systemLanguage = language;
    } else {
      sysOptions.systemLanguage = defaultLanguage;
    }
    this.translate.setDefaultLang(sysOptions.systemLanguage);
    this.translate.use(sysOptions.systemLanguage);

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  getSuitableLanguage(language) {
    language = language.substring(0, 2).toLowerCase();
    return availableLanguages.some(x => x.code == language) ? language : defaultLanguage;
  }
}
