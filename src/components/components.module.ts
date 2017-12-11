import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { MyHeaderComponent } from './my-header/my-header';

@NgModule({
	declarations: [MyHeaderComponent],
	imports: [IonicModule,
    TranslateModule.forChild()],
	exports: [MyHeaderComponent]
})
export class ComponentsModule {}
