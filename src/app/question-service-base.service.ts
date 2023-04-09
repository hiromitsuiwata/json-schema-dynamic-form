import { Observable } from "rxjs";
import { QuestionBase } from "./question-base";


export abstract class QuestionServiceBase {
  abstract getQuestions(url: string): Observable<QuestionBase<string>[]>;
}
