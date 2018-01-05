import { Component, ViewChild } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, Events } from 'ionic-angular';
import { sysOptions, availableLanguages } from '../../components/my-header/my-header.constants';
import { PlacesProvider } from '../../providers/places/places';

import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 LatLng,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') element;
  map: GoogleMap;

  places: any;
  markerGroups:any = {
    "es": [],
    "en": [],
    "fr": []
  };

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public placesProvider: PlacesProvider,
      public events: Events,
      public googleMaps: GoogleMaps,
      public plt: Platform
  ) {
      events.subscribe('languageChanged', () => {
           this.showMarkersForLanguage();
       });
  }

  ionViewDidLoad() {
    this.getPlaces();
  }

  initMap() {
    let mapOptions: GoogleMapOptions = {
          camera: {
            target: {
              lat: -27.50,
              lng: -64.86
            },
            zoom: 14,
            tilt: 30
          }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.addMarkerForPlaces();
      this.showMarkersForLanguage();
    });
  }

  addMarkerForPlaces() {
    for (let k in this.places) {
      for (let l in this.places[k].langs) {
        var name = this.places[k].langs[l].title;
        var type = l;

        let coordinates: LatLng = new LatLng(
          parseFloat(this.places[k].latitude),
          parseFloat(this.places[k].longitude)
        );

        this.createMarker(coordinates, name, type, this.places[k]);
      }
    }
  }

  createMarker(point, name, type, item) {
      //icon: "assets/images/icons8-Marker-64.png",
    let markerOptions: MarkerOptions = {
        position: point,
        title: name,
        type: type
    };

    if (!this.markerGroups[type]){
        this.markerGroups[type] = [];
    }

    this.map.addMarker(markerOptions)
      .then((marker: Marker) => {
        this.markerGroups[type].push(marker);
        marker.on(GoogleMapsEvent.INFO_CLICK)
          .subscribe(() => {
            this.navCtrl.push('DetailPage', {
              item: item
            });
          });
    });
  }

  showMarkersForLanguage() {
      for (let k in availableLanguages) {
          for (var i = 0; i < this.markerGroups[availableLanguages[k].code].length; i++) {
              var marker = this.markerGroups[availableLanguages[k].code][i];
              if (availableLanguages[k].code == sysOptions.systemLanguage) {
                  marker.setVisible(true);
              } else {
                  marker.setVisible(false);
              }
          }
      }
  }

  getPlaces() {
    this.placesProvider.getAll()
    .then(data => {
      this.places = data;
      this.initMap();
    });
  }
}
