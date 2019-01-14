import {enum_only_string} from "@beenotung/tslib/enum";

export enum StoreKey {
  priorities,
  tasks,
}

enum_only_string(StoreKey);
