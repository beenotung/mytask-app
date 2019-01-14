import {id} from "./common";

export interface Task {
  id: id
  parent?: id
  name: string
  priority: id
  deadline: number
}
