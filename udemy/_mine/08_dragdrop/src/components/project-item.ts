/// <reference path="base-component.ts"/> //
// Component 가져오기
/// <reference path="../decorators/autobind.ts"/> //
/// <reference path="../models/project.ts"/> //
/// <reference path="../models/drag-drop.ts"/> //

import { Draggable } from '../models/drag-drop';
// 이미 컴파일된 파일을 자바스크립트가 가져와야 하므로 JS 파일을 import한다
import { Project } from '../models/project';
import Component from './base-component';
import { AutoBind } from '../decorators/autobind';




// namespace App {
// Project Item Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;
  /**
   *
   * @param hostId 사용하는 템플릿 id
   * @param project Project를 가져온다
   */

  get persons() {
    if (this.project.people === 1) {
      return '1 person';
    } else {
      return `${this.project.people} persons`;
    }
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    // 데이터 전송 프로퍼티가 있고 그 프로퍼티에서 데이터를 드래그 이벤트에 붙인다
    event.dataTransfer!.effectAllowed = 'move'; // 마우스 커서 변경
  }

  dragEndHandler(_: DragEvent) {}

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
    // persons 게터는 일반 프로퍼티처럼 접근한다
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
// }
