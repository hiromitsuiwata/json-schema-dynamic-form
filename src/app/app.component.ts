import { Component } from '@angular/core';

import { QuestionServiceMock } from './question-service-mock.service';
import { QuestionBase } from './question-base';
import { Observable } from 'rxjs';
import { QuestionServiceBase } from './question-service-base.service';
import { QuestionService } from './question-service.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="questions | async"></app-dynamic-form>
    </div>
  `,
  providers: [{ provide: QuestionServiceBase, useClass: QuestionService }]
})
export class AppComponent {
  questions: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionServiceBase) {
    this.questions = service.getQuestions();
    // this.questions.subscribe(qs => { console.log(qs.length) });
  }
}
