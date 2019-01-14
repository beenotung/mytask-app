import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {Priority} from "../../models/priority";
import {genId, isIdMatch} from "../../utils/id";
import {showToast} from "ioniclib";


@IonicPage()
@Component({
  selector: 'page-priority-list',
  templateUrl: 'priority-list.html',
})
export class PriorityListPage {
  newPriority: Priority;

  constructor(public navCtrl: NavController,
              public api: ApiProvider,
              public toastCtrl: ToastController,
              public navParams: NavParams) {
    this.resetNewPriority()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PriorityListPage');
  }

  get priorities(): Priority[] {
    return this.api.priorities
  }

  resetNewPriority() {
    this.newPriority = {
      id: genId(),
      name: ''
    }
  }

  saveNewPriority() {
    this.priorities.push(this.newPriority);
    this.api.priorities = this.priorities;
    this.resetNewPriority()
  }

  updatePriority(p: Priority) {
    let x = this.priorities.find(x => isIdMatch(x.id, p.id));
    if (x) {
      Object.assign(x, p)
    } else {
      this.priorities.push(p)
    }
    this.api.priorities = this.priorities;
    showToast(this.toastCtrl, {message: 'Updated Priority ' + p.id})
  }
}
