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
      <div *ngIf="questions1 | async as resolvedQuestions">
        <app-dynamic-form [questions]="resolvedQuestions"/>
      </div>
      <div *ngIf="questions2 | async as resolvedQuestions">
        <app-dynamic-form [questions]="resolvedQuestions"/>
      </div>
    </div>
  `,
  providers: [{ provide: QuestionServiceBase, useClass: QuestionService }]
})
export class AppComponent {
  questions1: Observable<QuestionBase<any>[]>;
  questions2: Observable<QuestionBase<any>[]>;


  constructor(service: QuestionServiceBase) {
    this.questions1 = service.getQuestions('http://localhost:3000/questions');
    this.questions2 = service.getQuestions('http://localhost:3000/address');
  }
}
