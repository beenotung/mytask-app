import {Component, NgZone} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {Task} from '../../models/task';
import {find, upsert} from "../../utils/array";
import {id} from "../../models/common";
import {genId, idToString, isIdMatch} from "../../utils/id";
import {ApiProvider} from "../../providers/api/api";
import {showToast} from "ioniclib/utils/toast";
import {formatTimeLeft} from "../../utils/time";
import {remove} from "@beenotung/tslib/array";
import {MINUTE, SECOND} from "@beenotung/tslib/time";
import {format_datetime} from "@beenotung/tslib/format";
import moment = require("moment");

@IonicPage()
@Component({
  selector: 'page-task-list',
  templateUrl: 'task-list.html',
})
export class TaskListPage {
  newTask: Task;

  taskTimes = {} as any;

  constructor(public navCtrl: NavController,
              public api: ApiProvider,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public ngZone: NgZone,
              public navParams: NavParams) {
    this.resetNewTask()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TaskListPage');
    this.updateTime();
    setInterval(() => this.updateTime(), SECOND);
  }

  get tasks() {
    return this.api.tasks;
  }

  get priorities() {
    return this.api.priorities
  }

  updateTime() {
    this.tasks.forEach(task => this.taskTimes[idToString(task.id)] = formatTimeLeft(task.deadline))
  }

  resetNewTask() {
    this.newTask = {
      id: genId(),
      name: '',
      priority: undefined,
      deadline: 0
    }
  }

  saveNewTask() {
    this.newTask.deadline = Date.now() + MINUTE * 15;
    this.tasks.push(this.newTask);
    this.api.tasks = this.tasks;
    this.resetNewTask();
    showToast(this.toastCtrl, {message: 'Saved New Task'})
  }

  showTaskDetail(task_id: id) {
  }

  getPriorityName(priority_id: id) {
    return find(this.priorities, p => isIdMatch(p.id, priority_id), p => p.name, () => ' - ')
  }

  getPossibleParentTasks(task_id: id) {
    return this.tasks.filter(x => !isIdMatch(x.id, task_id))
  }

  changeTaskDeadline(task: Task) {
    let m = moment(new Date(task.deadline));
    const prompt = this.alertCtrl.create({
      title: 'Change Task Deadline',
      message: task.name + '<p>Due: ' + format_datetime(task.deadline) + '</p>',
      inputs: [
        {
          name: 'date',
          type: 'date',
          value: m.format('YYYY-MM-DD'),
          label: 'Date',
        },
        {
          name: 'time',
          type: 'time',
          value: m.format('HH:mm'),
          label: 'Time',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            console.log('Saved clicked');
            task.deadline = moment(data.date + ' ' + data.time).toDate().getTime();
            this.api.tasks = upsert(this.tasks, x => isIdMatch(x.id, task.id), task);
            showToast(this.toastCtrl, {message: 'Updated Task ' + task.id})
          }
        }
      ]
    });
    prompt.present();
  }

  updateTask(task: Task) {
    this.api.tasks = upsert(this.tasks, x => isIdMatch(x.id, task.id), task);
    showToast(this.toastCtrl, {message: 'Updated Task ' + task.id})
  }

  deleteTask(task: Task) {
    remove(this.tasks, task);
    this.api.tasks = this.tasks;
    showToast(this.toastCtrl, {message: 'Deleted Task ' + task.id})
  }
}
