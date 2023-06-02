// Code goes here!

// 싱글톤 클래스를 활용함
// 외부에선 접근이 안되고 해당 클래스 내에서만 접근이 가능하다

// Project State Management
class ProjectState {
  private listeners: any[] = [];
  private projects: any[] = [];
  // 클래스를 통해 인스턴스를 생성할 필요 없이,
  // 클래스의 속성 또는 메서드를 사용하고자 한다면 static 키워드를 사용해 속성, 메서드를 정의
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFunc: Function) {
    this.listeners.push(listenerFunc);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = {
      id: Math.random().toString(),
      title: title,
      description: description,
      people: numOfPeople,
    };
    this.projects.push(newProject);
    for (const listenerFunc of this.listeners) {
      listenerFunc(this.projects.slice());
    }
  }
}

// 프로젝트 상태 예시를 생성
// 아래에서 폼에 프로젝트 내용을 입력하면 리스트가 생성되는데
// 이를 위한 상수
const projectState = ProjectState.getInstance();

// validate
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number; // 문자열 길이 검사
  maxLength?: number; // 문자열 길이 검사
  min?: number; // 숫자의 값 검사
  max?: number; // 숫자의 값 검사
  // ?를 뒤에 붙인 항목은 선택사항이다
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // null로 느슨한 비교를 하면 undefined도 같이 걸러진다
  // null == undefined (true), null === undefined (false)
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }

  return isValid;
}

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

// Project List Class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  // 만들 리스트의 키워드: 'active' | 'finished'
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app') as HTMLDivElement;
    this.assignedProjects = []; // 배열 초기화

    console.log(this.assignedProjects);
    

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLElement; // section
    this.element.id = `${this.type}-projects`;

    // 프로젝트 리스트가 만들어진 후 renderProjects를 하기 때문에
    // renderContent가 먼저 실행된다
    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listElem = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    for (const projectItem of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = projectItem.title;
      // listItem.textContent = projectItem.description;
      // listItem.textContent = projectItem.people;
      listElem.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;

    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

// project input Class
// 정보를 취합하는 클래스
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

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5,
    };

    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
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
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
