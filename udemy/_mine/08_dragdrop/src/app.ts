// Code goes here!
// Project Type
// 입력받는 프로젝트 항목의 타입을 항상 기억해야하므로 따로 클래스로 만들어 관리한다

// 열거형으로 status를 숫자로 사용한다
// Project Type
enum ProjectStatus {
  Active,
  Finished,
}
class Project {
  constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
}

// 싱글톤 클래스(객체의 인스턴스가 오직 1개만 생성)를 활용함
// 외부에선 접근이 안되고 해당 클래스 내에서만 접근이 가능하다
// Project State Management

type Listener<T> = (items: T[]) => void; // 리스너 함수가 반환하는 값은 신경 쓰지 않습니다

class State<T> {
  protected listeners: Listener<T>[] = [];
  // protected: 외부에선 접근을 못하지만 상속받는 클래스에서는
  // 어디서나 접그닝 가능하다는 뜻

  addListener(listenerFunc: Listener<T>) {
    this.listeners.push(listenerFunc);
  }
}

class ProjectState extends State<Project> {
  private projects: Project[] = [];
  // 클래스를 통해 인스턴스를 생성할 필요 없이,
  // 클래스의 속성 또는 메서드를 사용하고자 한다면 static 키워드를 사용해 속성, 메서드를 정의
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active);
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

// Component Base Class
// 제너릭 클래스를 이용
// 직접적인 인스턴스화가 이뤄지지 않도록 추상클래스로 변경
// 추상 클래스는 항상 상속을 이용한다
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  // 템플릿의 id를 알아야 그걸 어떻게 선택할 지 알기때문에
  // constructor를 이용한다
  /**
   *
   * @param templateId : 템플릿 id
   * @param hostElementId : 보여주는 곳의 id
   * @param insertAtStart: 어느 위치에 elem을 넣는지 (선택적 요소 뒤에 넣으면 실행되지 않으므로 선택적 요소보다 앞에 있어야 한다)
   * @param newElementId : 새로 생성한 요소의 id, 선택적 요소이므로 ?를 붙인다
   */
  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    // 선택적 옵션이므로 newElementId가 있을 경우만 할당
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attach(insertAtStart);
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
  }

  // 실제로 구현되지 않는다는 뜻
  // 상속받는 모든 클래스에서 추가시킬 수 있다
  // 비공개(private) 메소드는 추상 메소드에는 사용할 수 없다
  abstract configure?(): void; // 선택적 메소드
  abstract renderContent(): void;
}

// Project Item Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  private project: Project;
  /**
   *
   * @param hostId 사용하는 템플릿 id
   * @param project Project를 가져온다
   */
  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  configure() {}

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.project.people.toString();
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

// Project List Class
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[];

  // 만들 리스트의 키워드: 'active' | 'finished'
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);

    this.assignedProjects = []; // 배열 초기화

    // 프로젝트 리스트가 만들어진 후 renderProjects를 하기 때문에
    // renderContent가 먼저 실행된다
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active;
        }
        return prj.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.renderContent();
  }

  configure() {}

  renderContent() {
    const listId = `${this.type}-projects-list`;

    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
    const listElem = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
    listElem.innerHTML = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}

// project input Class
// 정보를 취합하는 클래스
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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

    // console.log(titleValidatable, descriptionValidatable, peopleValidatable);
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
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
