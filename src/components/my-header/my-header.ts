import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { availableLanguages, sysOptions } from './my-header.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'my-header',
  templateUrl: 'my-header.html'
})
export class MyHeaderComponent {

  languages = availableLanguages;

  constructor(public alertCtrl: AlertController,
      public translateService: TranslateService
  ) {

  }

  showRadio() {
      let alertTitle = " ";
      let alertBtnOk = " ";
      let alertBtnCancel = " ";

console.log('get values');
console.log(this.translateService.currentLang);

console.log(this.translateService.getTranslation('SELECT_LANGUAGE_TITLE'));
      this.translateService.get(['SELECT_LANGUAGE_TITLE', 'SELECT_LANGUAGE_OK', 'SELECT_LANGUAGE_CANCEL']).subscribe(values => {
          alertTitle = values['SELECT_LANGUAGE_TITLE'];
          alertBtnOk = values['SELECT_LANGUAGE_OK'];
          alertBtnCancel = values['SELECT_LANGUAGE_CANCEL'];
        });


    let alert = this.alertCtrl.create();
    alert.setTitle(alertTitle);

    for (let k in this.languages) {
        alert.addInput({
          type: 'radio',
          label: this.languages[k].name,
          value: this.languages[k].code,
          checked: (this.languages[k].code==sysOptions.systemLanguage)
        });
    }

    alert.addButton(alertBtnCancel);
    alert.addButton({
      text: alertBtnOk,
      handler: data => {
        sysOptions.systemLanguage = data;
        this.translateService.use(sysOptions.systemLanguage);
        
        console.log(sysOptions.systemLanguage);
        console.log(this.translateService.currentLang);
        console.log(this.translateService.getLangs());
      }
    });
    alert.present();
  }

}
