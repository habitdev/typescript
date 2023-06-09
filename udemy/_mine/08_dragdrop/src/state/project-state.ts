import { Project, ProjectStatus } from '../models/project';

// namespace App {
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

export class ProjectState extends State<Project> {
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
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFunc of this.listeners) {
      listenerFunc(this.projects.slice());
    }
  }
}

// 프로젝트 상태 예시를 생성
// 아래에서 폼에 프로젝트 내용을 입력하면 리스트가 생성되는데
// 이를 위한 상수
export const projectState = ProjectState.getInstance();
// }
