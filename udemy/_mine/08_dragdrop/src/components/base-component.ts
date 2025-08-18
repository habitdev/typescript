// namespace App {
  // Component Base Class
  // 제너릭 클래스를 이용
  // 직접적인 인스턴스화가 이뤄지지 않도록 추상클래스로 변경
  // 추상 클래스는 항상 상속을 이용한다


// default는 파일당 하나만 사용할 수 있는 키워드이다

  export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
// }
