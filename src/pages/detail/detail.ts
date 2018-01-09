import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TranslateService } from '@ngx-translate/core';
import { sysOptions } from '../../components/my-header/my-header.constants';

import { AudioProvider, IAudioTrack, ITrackConstraint } from 'ionic-audio';

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  item: any;
  placeImages: string[];
  currentTrack: ITrackConstraint;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public translateService: TranslateService,
      private _audioProvider: AudioProvider
  ) {
      this.item = navParams.get('item');
      this.placeImages = this.item.multimedia;
      this.currentTrack = this._audioProvider.create({
          src: 'https://archive.org/download/swrembel2010-03-07.tlm170.flac16/swrembel2010-03-07s1t05.mp3',
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
      });
  }

  getTitle() {
    return this.item.langs[sysOptions.systemLanguage].title;
  }

  getDescription()
  {
      return this.item.langs[sysOptions.systemLanguage].description;
  }

  play() {
    // use AudioProvider to control selected track
    this._audioProvider.play(0);
  }

  pause() {
     // use AudioProvider to control selected track
     this._audioProvider.pause();
  }
}
