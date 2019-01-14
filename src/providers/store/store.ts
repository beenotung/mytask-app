import {Injectable} from '@angular/core';


@Injectable()
export class StoreProvider {

  constructor() {
    console.log('Hello StoreProvider Provider');
  }

  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key) {
    let value = localStorage.getItem(key);
    try {
      return JSON.parse(value)
    } catch (e) {
      return value;
    }
  }
}
