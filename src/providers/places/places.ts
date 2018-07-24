import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

//  apiUrl = 'http://trh.goandtour.com';
apiUrl = 'assets';

  constructor(public http: HttpClient) {

  }

  getAll() {
  return new Promise(resolve => {
    this.http.get(this.apiUrl+'/places.json').subscribe(data => {
      resolve(data);
    }, err => {
      console.log(err);
    });
  });
}

}
