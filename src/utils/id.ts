import {id} from "../models/common";
import {getStore, setStoreName} from "@beenotung/tslib/store";
import {base58Letters, Random} from "@beenotung/tslib/random";

export function idToString(id: id) {
  return typeof id === "string" ? id : id.toString()
}

export function isIdMatch(a: id, b: id) {
  /* tslint:disable */
  return a == b;
  /* tslint:enable */
}

setStoreName('data');
let store = getStore();

function getDeviceId() {
  let key = 'device_id';
  let deviceId = store.getItem(key);
  if (!deviceId) {
    deviceId = Random.nextString(8, base58Letters);
    store.setItem(key, deviceId);
  }
  return deviceId.replace(/"/g, '');
}

export let deviceId: string = getDeviceId();

export function genId() {
  let key = 'id';
  let last = +store.getItem(key) || 0;
  let next = last + 1;
  store.setItem(key, next.toString());
  return [
    deviceId,
    Date.now(),
    next,
  ].join('-');
}
