import { Component } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { availableLanguages, sysOptions } from './my-header.constants';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'my-header',
  templateUrl: 'my-header.html'
})
export class MyHeaderComponent {

  languages = availableLanguages;
  currentLanguage = sysOptions.systemLanguage;

  constructor(public alertCtrl: AlertController,
      public translateService: TranslateService,
      public events: Events
  ) {
      events.subscribe('languageChanged', () => {
          this.currentLanguage = sysOptions.systemLanguage;
          this.translateService.use(sysOptions.systemLanguage);

          var audios = document.getElementsByTagName('audio');
          for(var i = 0, len = audios.length; i < len;i++){
                audios[i].pause();
                audios[i].load();
          }
       });
       this.translateService.use(sysOptions.systemLanguage);
  }

  showRadio() {
      let alertTitle = " ";
      let alertBtnOk = " ";
      let alertBtnCancel = " ";

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
        this.currentLanguage = sysOptions.systemLanguage;
        this.translateService.use(sysOptions.systemLanguage);
        this.events.publish("languageChanged");
      }
    });
    alert.present();
  }

}
