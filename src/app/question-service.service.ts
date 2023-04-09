import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { map, Observable } from 'rxjs';
import { QuestionServiceBase } from './question-service-base.service';

@Injectable()
export class QuestionService extends QuestionServiceBase {
  constructor(private http: HttpClient) { super() }

  /**
   * サーバから質問内容を取得してQuestionBaseのリストを作る
   *
   * @returns
   */
  getQuestions(url: string): Observable<QuestionBase<string>[]> {

    const o = this.http.get<any>(url);

    const result = o.pipe(map((content: any) => {
      const questions: QuestionBase<string>[] = [];
      const properties = content['properties'];

      Object.keys(properties).forEach((key: string) => {

        const value = properties[key];

        console.log(key + ' -> ' + value);

        let instance;
        switch (value.type) {
          case 'string':
            instance = new TextboxQuestion({
              key: key,
              label: value.label,
              value: value.defaultValue,
              required: value.required,
              type: value.htmlType,
              order: value.order
            });
            questions.push(instance);
            break;
          case 'options':
            instance = new DropdownQuestion({
              key: key,
              label: value.label,
              options: value.options,
              order: value.order
            });
            questions.push(instance);
            break;
          default:
            console.log("default");
            break;
        }
      });
      return questions;
    }));

    return result;
  }
}
