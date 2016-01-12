import {Injectable} from 'angular2/core';
import {Http} from "angular2/http";

@Injectable()
export class Grade {
  grades = {};
  constructor(public http: Http) {
    this.http.get('/assets/oceny.json')
      .map(res => res.json())
      .subscribe(
        data => this.grades = data,
        err => console.log("Error", err),
        () => console.log("Loaded data")
      );
  }

  getGrade(names, surname, index) {
    for(var ind in this.grades) {
      var grade = this.grades[ind];
      if(grade[0] == names && grade[1] == surname && grade[2] == index) {
        return grade.slice(3).map(function(item) {
          return item == '-' ? 0 : item;
        });
      }
    }
  }
}
