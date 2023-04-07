import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { QuestionServiceBase } from './question-service-base.service';

@Injectable()
export class QuestionService extends QuestionServiceBase {
  constructor(private http: HttpClient) { super() }

  // TODO: get from a remote source of question metadata
  getQuestions(): Observable<QuestionBase<string>[]> {

    const o = this.http.get<any[]>('http://localhost:3000/questions');

    return o.pipe(map((array: any[]) => {
      const questions: QuestionBase<string>[] = [];
      array.forEach((elem: any) => {
        // const className = elem.class;
        const instance = new TextboxQuestion({
          key: elem.key,
          label: elem.label,
          value: elem.defaultValue,
          required: elem.required,
          order: elem.order
        });
        // const instance = new (Function("return new " + className)());
        // instance.key = elem.key;
        // instance.label = elem.label;
        // instance.value = elem.defaultValue;
        // instance.required = elem.required;
        // instance.order = elem.order;
        // console.log(instance);
        questions.push(instance);
      });
      // console.log(questions.length);
      return questions;
    }));


    // resp.pipe(map(forEach(resp: any => {
    //   const className = resp.class;
    //   // const className = "TextboxQuestion";
    //   const instance = new (Function("return new " + className)());
    //   // const instance = new TextboxQuestion();
    //   instance.key = resp.key;
    //   instance.label = resp.label;
    //   instance.value = resp.defaultValue;
    //   instance.required = resp.required;
    //   instance.order = resp.order;
    //   return instance;
    // }));


    // resp.subscribe((respArray: any[]) => {
    //   console.log(respArray);
    //   respArray.forEach(resp => {
    //     // const className = resp.class;
    //     // const className = "TextboxQuestion";
    //     // const instance = new (Function("return new " + className)());
    //     // const instance = new TextboxQuestion();
    //     // instance.key = resp.key;
    //     // instance.label = resp.label;
    //     // instance.value = resp.defaultValue;
    //     // instance.required = resp.required;
    //     // instance.order = resp.order;
    //     // console.log(instance);

    //     const instance = new TextboxQuestion({
    //       key: 'firstName',
    //       label: 'First name',
    //       value: 'Bombasto',
    //       required: true,
    //       order: 1
    //     });
    //     questions.push(instance);
    //   });
    // });

    // console.log(questions.length);
    // return of(this.sort(questions));
  }

  sort(questions: QuestionBase<string>[]): QuestionBase<string>[] {
    return questions.sort((a, b) => a.order - b.order);
  }
}
