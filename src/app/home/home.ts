import {Component} from 'angular2/core';
import {FORM_DIRECTIVES} from 'angular2/common';
import {Http} from 'angular2/http';

import {Grade} from './providers/grade';
import {XLarge} from './directives/x-large';

@Component({
  selector: 'home',  // <home></home>
  // We need to tell Angular's Dependency Injection which providers are in our app.
  providers: [
    Grade
  ],
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [
    ...FORM_DIRECTIVES,
    XLarge
  ],
  // We need to tell Angular's compiler which custom pipes are in our template.
  pipes: [ ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [ require('./home.css') ],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: require('./home.html')
})
export class Home {
  names = '';
  surname = '';
  index = '000000';
  studentGrade = [];
  maxPoints = [15.0, 0.0, 12.0, 0.0, 0.0, 14.0, 14.0, 20.0, 15.0, 15.0, 15.0, 15.0, 10.0];
  number = ['1', '1 dodatkowe', '2', '2 dodatkowe', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  droped = -1;
  ocena = 0;
  constructor(public grade: Grade) {

  }

  calculate() {
    var suma = 0;
    var max = 0;
    this.studentGrade = this.grade.getGrade(this.names, this.surname, this.index);
    for (var i in this.maxPoints) {
      if (i !== this.droped) {
        if (!isNaN(parseInt(this.studentGrade[i]))) {
          suma += parseInt(this.studentGrade[i]);
          max += this.maxPoints[i];
        }
      }
      this.studentGrade[i] = 'Sprawozdanie ' + this.number[i] + ': ' +
                              this.studentGrade[i] + ' z ' + this.maxPoints[i].toFixed(2);
    }
    this.ocena = Math.floor ( (suma / max) * 10000) / 100;
  }
}
