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

/**
 * 타입가드:
 * 특정 속성이나 메소드를 사용하기 전에 그것이 존재하는지 확인하거나 타입을 사용하기 전에 이 타입으로 어떤 작업을 수행할 수 있는지를 확인하는 개념 또는 방식
 * - 유니온 타입을 활용할 시 각 타입에 맞게 응용할 수 있도록 도와준다
 * - typeof, in, instanceof
 */

// 1. 타입가드) 속성 타입 확인
function add(a: Combinable, b: Combinable) {
  // 이 부분이 타입가드
  // 유니온 타입일 경우 해당 변수가 어떤 타입을 가지고 있는 지 확인
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b;
}

// 2. 타입가드)속성 존재 여부
type UnKnownEmployee = Employee | Admin;
function printEmployeeInformation(employee: UnKnownEmployee) {
  console.log('Name: ' + employee.name);
  // if (employee.privileges) { // 불가능
  if ('privileges' in employee) {
    // employee안에 privileges 속성이 있는 지 확인
    console.log('Privileges: ' + employee.privileges);
  }
  if ('startDate' in employee) {
    console.log('Privileges: ' + employee.startDate);
  }
}

printEmployeeInformation(e1);
printEmployeeInformation({ name: 'Max', startDate: new Date() });

// 3. 타입가드) 클래스를 사용하여 작업하는 경우
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    // instanceof은 자바스크립트에 내장된 일반 연산자이다
    // Truck 생성자 함수를 기반으로 생성되었는지 확인
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

/**
 * 특수한 typeof 타입가드나 타입가드를 도와주는 구별된 유니언을 사용할 수 있습니다
 * 타입 가드를 쉽게 구현할 수있게 해주는 유니언 타입으로 작업을 수행할 때 사용할 수 있는 패턴으로 객체 타입으로 작업할 때도 사용할 수 있다
 *
 * 따라서, 공통적인 타입을 설정하여 그로 구분하여 결과를 만든다
 * ex)  type: 'bird';
 *
 *
 *
 */

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;
function moveAnimal(animal: Animal) {
  // 인터페이스로 작성하여 instanceof로 검사할 수 없다
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;

      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;

    default:
      break;
  }

  console.log('Moving with speed: ' + speed);
}

// runningSpeed은 bird에 없으므로 오류가 난다
moveAnimal({ type: 'bird', flyingSpeed: 10 });
