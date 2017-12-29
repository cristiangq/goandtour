import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { sysOptions, availableLanguages } from '../../components/my-header/my-header.constants';
import { PlacesProvider } from '../../providers/places/places';

declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
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
      public events: Events
  ) {
      this.getPlaces();
      events.subscribe('languageChanged', () => {
           this.showMarkersForLanguage();
       });
  }

  ionViewDidLoad(){
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 14,
      center: {lat: -27.50, lng: -64.86}
    });
  }

  addMarkerForPlaces() {
      var infoWindow = new google.maps.InfoWindow();
      for (let k in this.places) {
          for (let l in this.places[k].langs) {
              var name = this.places[k].langs[l].title;
              var address = this.places[k].address;
              var type = l;

              var point = new google.maps.LatLng(
                  parseFloat(this.places[k].latitude),
                  parseFloat(this.places[k].longitude)
              );
              
              this.createMarker(point, name, address, type, infoWindow, this.map);
          }
      }
      this.events.publish("languageChanged");
  }

  createMarker(point, name, address, type, infoWindow, map) {
    //var icon = customIcons[type] || {};
    var marker = new google.maps.Marker({
        map: map,
        position: point,
        //icon: icon.icon,
        // shadow: icon.shadow,
        type: type
    });
    if (!this.markerGroups[type]){
        this.markerGroups[type] = [];
    }
    this.markerGroups[type].push(marker);
    var html = "<b>" + name + "</b> <br/>" + address;
    this.bindInfoWindow(marker, html, infoWindow, map);
    return marker;
  }

  bindInfoWindow(marker, html, infoWindow, map) {
    google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
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
      this.addMarkerForPlaces();
    });
  }
}
