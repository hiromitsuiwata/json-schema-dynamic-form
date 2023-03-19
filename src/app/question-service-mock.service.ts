import { Injectable } from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { Observable, of } from 'rxjs';
import { QuestionServiceBase } from './question-service-base.service';

@Injectable()
export class QuestionServiceMock extends QuestionServiceBase {

  // TODO: get from a remote source of question metadata
  getQuestions(): Observable<QuestionBase<string>[]> {

    const questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          { key: 'solid', value: 'Solid' },
          { key: 'great', value: 'Great' },
          { key: 'good', value: 'Good' },
          { key: 'unproven', value: 'Unproven' }
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })
    ];

    return of(this.sort(questions));
  }

  sort(questions: QuestionBase<string>[]): QuestionBase<string>[] {
    return questions.sort((a, b) => a.order - b.order);
  }
}
