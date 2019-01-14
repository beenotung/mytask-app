import {Component} from '@angular/core';
import {pages} from "../pages";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = pages.HomePage;
  TaskListPage = pages.TaskListPage;
  PriorityListPage = pages.PriorityListPage;
  AboutPage = pages.AboutPage;
  tab3Root = pages.ContactPage;

  constructor() {

  }
}
