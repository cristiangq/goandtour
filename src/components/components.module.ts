import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { MyHeaderComponent } from './my-header/my-header';
import { MyCardComponent } from './my-card/my-card';

@NgModule({
	declarations: [MyHeaderComponent,
    MyCardComponent],
	imports: [IonicModule],
	exports: [MyHeaderComponent,
    MyCardComponent]
})
export class ComponentsModule {}
