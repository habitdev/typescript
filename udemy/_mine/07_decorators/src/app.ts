/**
 * 데코레이터: 메타 프로그래밍(metaprogramming)에 유용한 함수이다
 *
 * 메타 프로그래밍: 엔드 유저가 페이지를 방문하는데, 보통 곧바로 영향을 주기에
 * 데코레이터를 사용하지 않습니다
 * 대신에 코드를 쓰는 데 적합하도록 만들어
 * 데코레이터를 다른 개발자들이 사용하기 쉽게 하는 것
 *
 * experimentalDecorators가 true로 설정되어 있어야 한다
 *
 * 데코레이터는 보통 클래스들에 적용된다
 * - 데코레이터는 인수를 받는다
 * - 데코레이터는 실체화되기 전 클래스가 정의만 돼도 실행된다
 *
 */

// 클래스 통째에 적용되는 데코레이터
function Logger(logstring: string) {
  console.log('LOGGER FACTORY');

  return function (constructor: Function) {
    // 새 함수를 반환하는 함수로 변경
    console.log(logstring);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');

  return function <T extends { new (..._: any[]): { name: string } }>(originalConstructor: T) {
    // return function (_: Function) {
    // "_"은 입력해서 존재는 알지만 쓰지 않겠다고 명시할 경우 사용

    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        console.log('Rendering template');
        const hookEl = document.getElementById(hookId);
        // const person = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// @Logger('LOGGING - PERSON') // @은 특별한 식별자
@Logger('LOGGING')
@WithTemplate('<h1>My Person Object!</h1>', 'app')
// 데코레이터 함수를 실행하려는 게 아니라 데코레이터 함수와 같은 걸 반환해 줄 함수를 실행하는 것
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

// Person울 실체화하지 않아도 데코레이터(Logger)는 실행된다
const pers = new Person();
console.log(pers);

/**
 * 데코레이터를 만드는 대신, 데코레이터 팩토리(factory)를 정의할 수 있다
 * 데코레이터 함수를 도출하는데 어떤 대상에 데코레이터를 할당할 때 설정할 수 있도록 해준다
 *
 * 데코레이터를 사용할 수 있는 클래스나 어떤 곳에 하나보다 많은 데코레이터를 사용할 수 없다
 * 데코레이터는 가장 마지막부터 위로 실행된다
 *
 *
 */

function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
      // 양수일 경우만
    } else {
      throw new Error('Invalid price = should be positive!');
    }
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const product1 = new Product('Book', 19);
const product2 = new Product('Book 2 ', 29);
/** 데코레이터는 클래스가 정의되었을 때만 작동하는 함수 */

// 자동으로 객체를 bind해주는 데코레이터 작성
// function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false, // for in루프를 표시하지 않도록 함
    get() {
      const boundFunc = originalMethod.bind(this);
      // this는 addEventListener로 변경할 수 없다
      return boundFunc;
    },
  };

  return adjustDescriptor;
}

class Printer {
  message = 'This Works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const prt = new Printer();

const button = document.querySelector('button')!;
// !: 이것은 존재하며 null 이 아님을 표시
button?.addEventListener('click', prt.showMessage);
// prt가 아닌 this를 바인딩하므로 bind할 것을 지정해준다
// 바인딩할 객체 지정

/** 유효성 검사를 위한 데코레이터 */
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registerValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name],
    [propertyName]:  [...(registerValidators[target.constructor.name]?.[propertyName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propertyName: string) {
  registerValidators[target.constructor.name] = {
    ...registerValidators[target.constructor.name], // 기존 저장된 것들을 먼저 불러온 후
      [propertyName]: [...(registerValidators[target.constructor.name]?.[propertyName] ?? []), 'positive'], // 새로운 propertyName 추가
  };
}
function validate(obj: any) {
  const objValidatorConfig = registerValidators[obj.constructor.name];

  if (!objValidatorConfig) {
    // 유효성 검사를 할 객체가 하나도 없다
    return true;
  }

  let isValid = true;
  // prop 하나만 true여도 이상이 없다고 넘어가면 안되므로
  // isValid를 이용하여 검사한다
  for (const prop in objValidatorConfig) {
    console.log(prop);

    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]; // 값이 있는 경우 true
          break;

        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;

        default:
          break;
      }
    }
  }

  return isValid;
}
class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(tit: string, price: number) {
    this.title = tit;
    this.price = price;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; // +를 붙여 숫자로 변경

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});
