import { Component, OnInit } from '@angular/core';

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
      <div *ngIf="questions | async as state">
        <app-dynamic-form [questions]="state"/>
      </div>
    </div>
  `,
  providers: [{ provide: QuestionServiceBase, useClass: QuestionService }]
})
export class AppComponent {
  questions: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionServiceBase) {
    this.questions = service.getQuestions();
  }
}
