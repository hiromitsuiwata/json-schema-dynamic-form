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

  /**
   * サーバから質問内容を取得してQuestionBaseのリストを作る
   *
   * @returns
   */
  getQuestions(): Observable<QuestionBase<string>[]> {

    const o = this.http.get<any[]>('http://localhost:3000/questions');

    return o.pipe(map((array: any[]) => {
      const questions: QuestionBase<string>[] = [];
      array.forEach((elem: any) => {

        console.log(elem);

        let instance;

        switch (elem.class) {
          case 'TextboxQuestion':
            instance = new TextboxQuestion({
              key: elem.key,
              label: elem.label,
              value: elem.defaultValue,
              required: elem.required,
              order: elem.order
            });
            questions.push(instance);
            break;
          case 'DropdownQuestion':
            instance = new DropdownQuestion({
              key: elem.key,
              label: elem.label,
              options: elem.options,
              order: elem.order
            });
            questions.push(instance);
            break;
          default:
            console.log("default");
            break;
        }
      });

      return this.sort(questions);
    }));
  }

  /**
   * ソートする
   *
   * @param questions
   * @returns
   */
  sort(questions: QuestionBase<string>[]): QuestionBase<string>[] {
    return questions.sort((a, b) => a.order - b.order);
  }
}
