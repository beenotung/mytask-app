import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PriorityListPage } from './priority-list';

@NgModule({
  declarations: [
    PriorityListPage,
  ],
  imports: [
    IonicPageModule.forChild(PriorityListPage),
  ],
})
export class PriorityListPageModule {}
