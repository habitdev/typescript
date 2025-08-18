// namespace는 타입스크립트에서만 제공하는 기능
// 네임스페이스 안에서만 사용가능
// 따라서 export키워드를 사용해서 외부에서도 이용가능하게 한다

// namespace App {
  // Drag & Drop interface
  export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }
  export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }
// }
