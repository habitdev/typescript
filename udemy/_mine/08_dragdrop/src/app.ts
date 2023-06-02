// Code goes here!
// auto bind decorator
function AutoBind(_: any, _2: string, decorator: PropertyDescriptor) {
  const originalMethod = decorator.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,

    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// project input Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    // importNode: 현재 문서가 아닌 외부 문서의 노드를 복사하여 현재 문서에 넣을 수 있도록 해줍니다.(복사)
    // document.importNode(externalNode, deep);
    // externalNode: 가져올 노드
    // deep: 불리언 타입을 가지며, 다른 문서에서 노드를 가져올 때 노드의 자식 요소들을 포함하여 가져올 것인지에 대한 여부를 결정합니다.

    // importedNode는 상수(const)라 X
    // importedNode는 DocumentFragment라서 아래의 attach에 삽입할 수 없다
    // 대신 그 안에 있는 확실한 HTML 엘리먼트에 접근해야 한다
    this.element = importedNode.firstElementChild as HTMLFormElement; // form
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.configure();
    this.attach();
  }

  private gatherUserInput(): [string, string, number] | void {
    // 아무것도 반환하지 않는다면 undefined가 아니라 void로 작성하는 것이 좋다
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    if (enteredTitle.trim().length === 0 || enteredDescription.trim().length === 0 || enteredPeople.trim().length === 0) {
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
      console.log(title, desc, people);
      this.clearInputs();
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
    // 특정 위치에 노드를 추가합니다.
    // insertAdjacentElement(position, element)
    // position:
    // - 'beforebegin',
    // - 'afterbegin': 타겟 Element Node의 첫 번째 Text Node 앞에
    // - 'beforeend': 타겟 Element Node의 마지막 Text Node 뒤에
    // - 'afterend': 타겟 Element Node 바로 뒤에
    // afterbegin / beforeend는 꼭 부모가 있어야 합니다.
  }
}

const projectInput = new ProjectInput();
