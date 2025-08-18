/// <reference path="base-component.ts"/> //
/// <reference path="../decorators/autobind.ts"/> //
/// <reference path="../state/project-state.ts"/> //
/// <reference path="../models/project.ts"/> //
/// <reference path="../models/drag-drop.ts"/> //

import { DragTarget } from '../models/drag-drop';
import Component from './base-component';
import { AutoBind } from '../decorators/autobind';
import { Project, ProjectStatus } from '../models/project';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';

// namespace App {
// Project List Class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault(); // 드롭을 허용하지 않겠다(드래그만 가능)
      const listElem = this.element.querySelector('ul')!;
      listElem.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent) {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(prjId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent) {
    const listElem = this.element.querySelector('ul')!;
    listElem.classList.remove('droppable');
  }

  configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);
  }

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
// }
