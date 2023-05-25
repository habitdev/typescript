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

/**
 * 형 변환:
 * 타입스크립트가 직접 감지하지 못하는 특정 타입의 값을 타입스크립트에 알려주는 역할
 *
 *
 */

// const userInputElement = document.getElementById('user-input')!;
// 느낌표(!)를 사용하여 느낌표 앞의 표현식을 null로 반환하지 않겠다고
// 타입스크립트에게 인식 시킬 수 있다

// 기본적으로 모든 HTML요소가 타입으로서 갖는 이 제너릭 타입이 특정
// HTML 요소인 속성을 지원하지 않기 때문이다
// 타입 스크립트에게 userInputElement이 HTML요소임을 알리기 위해
// 형변환을 사용하여 구현할 수 있다

// const userInputElement = <HTMLInputElement>document.getElementById('user-input');
// 코드의 타입을 <>안에 입력한다
// tsconfig.json에서 dom lib를 사용하고 있어야 가능하다

// 위의 방식은 리액트에서 사용하는 JSX와 비슷하므로 이를 구별할 수 있도록
// 아래와 같이 변환할 수 도 있다
// const userInputElement = document.getElementById('user-input') as HTMLInputElement;

// null을 반환하지 않을거라는 확신이 있을 경우 아래와 같이 느낌표를 적어준다
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

const userInputElement = document.getElementById('user-input');
// 확신이 없다면 if()문으로 검사 후 실행한다
// 만약 if()문으로 검사할 경우
// null이 아닌 것을 확신할 수 없는 상태이므로 형변환은 제거해야 한다
if (userInputElement) {
  // 값이 있는 경우 ()로 감싸고 형변환을 한다
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}
