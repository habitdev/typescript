// Code goes here!
/**
 * 인터섹션 타입:
 * Intersection: 교차, 횡단
 * 인터페이스 상속과 밀접한 관련이 있다
 * 아래의 type을 interface로 변경해도 같은 결과가 나오기 때문이다
 * - 객체 타입과 함께 사용할 때 특히 유용
 * - 어떤 타입과도 함께 사용할 수 있다
 * - (교집)
 * - 공통적으로 가지고 있는 유니온 타입
 * 
 * 객체 타입 : 객체 속성의 조합
 */

// 이는 객체를 생성하는 게 아닌 타입을 정의하는 작업
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
  // Date는 자바스크립트에 내장된 Date 객체 기반의 타입스크립트가 지원하는 타입
};

type ElevatedEmployee = Admin & Employee;
// 두 타입을 결합
// 두 타입이 결합된 새 객체 타입
// interface ElevatedEmployee extends Admin, Employee {}

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date(),
};

type Combinable = string | number; // 유니언 타입
type Numeric = number | boolean;

type Universal = Combinable & Numeric;
// 이렇게 하면 Universal은 숫자형 타입으로 간주된다 
// 동일하게 가지고 있는 type이 number이기 때문이다

 
