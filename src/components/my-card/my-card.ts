import { Component } from '@angular/core';

/**
 * Generated class for the MyCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'my-card',
  templateUrl: 'my-card.html'
})
export class MyCardComponent {

  text: string;

  constructor() {
    console.log('Hello MyCardComponent Component');
    this.text = 'Hello World';
  }

}
