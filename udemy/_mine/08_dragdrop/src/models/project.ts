// Project Type
// 입력받는 프로젝트 항목의 타입을 항상 기억해야하므로 따로 클래스로 만들어 관리한다

// 열거형으로 status를 숫자로 사용한다
// Project Type
// namespace App {
export enum ProjectStatus {
  Active,
  Finished,
}
export class Project {
  constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) {}
}
// }
