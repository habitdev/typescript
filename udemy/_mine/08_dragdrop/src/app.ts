// Code goes here!

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

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
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
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