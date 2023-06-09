/// <reference path="base-component.ts"/> //
/// <reference path="../decorators/autobind.ts"/> //
/// <reference path="../util/validation.ts"/> //
/// <reference path="../state/project-state.ts"/> //

import Component from './base-component'; // default로 선언된 것만 import
import * as Validation from '../util/validation'; // 그룹화하기
import { AutoBind as AutoBind } from '../decorators/autobind'; // 이름 변경해서 사용하기
import { projectState } from '../state/project-state';

// namespace App {
// project input Class
// 정보를 취합하는 클래스
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
  }
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    // 아무것도 반환하지 않는다면 undefined가 아니라 void로 작성하는 것이 좋다
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validation.Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    // console.log(titleValidatable, descriptionValidatable, peopleValidatable);
    if (!Validation.validate(titleValidatable) || 
    !Validation.validate(descriptionValidatable) || 
    !Validation.validate(peopleValidatable)) {
      alert('Invalid input, please try again!');

      return;
    } else {
      return [enteredTitle, enteredDescription, parseFloat(enteredPeople)];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      // 튜플인지 아닌지는 런타임 중(자바스크립트에선 미지원) 알 수 없으므로
      // 튜플은 배열이기 때문에 배열인지 검사한다

      const [title, desc, people] = userInput;
      projectState.addProject(title, desc, people);
      this.clearInputs();
    }
  }
}
// }
