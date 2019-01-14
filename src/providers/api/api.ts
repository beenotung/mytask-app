import {Injectable} from '@angular/core';
import {StoreProvider} from "../store/store";
import {StoreKey} from "../../config/store-key";
import {Task} from "../../models/task";
import {Priority} from "../../models/priority";

@Injectable()
export class ApiProvider {
  caches = {} as any;

  constructor(public store: StoreProvider) {
    console.log('Hello ApiProvider Provider');
  }

  get tasks(): Task[] {
    return this.getCache(StoreKey.tasks) || []
  }

  set tasks(tasks: Task[]) {
    this.setCache(StoreKey.tasks, tasks);
  }

  get priorities(): Priority[] {
    return this.getCache(StoreKey.priorities) || []
  }

  set priorities(priorities: Priority[]) {
    this.setCache(StoreKey.priorities, priorities)
  }

  getCache(key) {
    if (!(key in this.caches)) {
      this.caches[key] = this.store.get(key)
    }
    return this.caches[key]
  }

  setCache(key, value) {
    this.caches[key] = value;
    this.store.set(key, value);
  }
}
