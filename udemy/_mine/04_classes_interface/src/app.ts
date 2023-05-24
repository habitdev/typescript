/**
 * 인터페이스: 객체의 형태를 설명하는 데 사용할 수 있습니다
 * 타입 스크립트에만 있다
 * 클래스와는 달리 인테피에스는 청사진을 사용하지 않고
 * 사용자 정의 타입으로 사용할 뿐이다
 * -> 구조만 있다
 *
 *
 * 객체의 타입을 확인하는 데 사용할 수 있다
 * (이 구조를 가져야 하는 객체에 대한 타입을 확인하는 타입으로 사용할 수 있다)
 *
 *
 * 왜 필요할까?
 * interface 와 사용자 지정 타입(type)은 완전히 같지 않다
 * 종종 바꿔서 사용하긴 한다
 *
 * ❗인터페이스는 객체의 구조를 설명하기 위해서만 사용
 *
 * 사용자 정의 타입으로도 가능한 작업은 클래스 내에  인터페이스를 구현하는 것이다
 *
 * 클래스가 인터페이스를 이행하고 준수해야 하는 약속처럼 사용할 수 있기 때문이다
 *
 *
 * => 주로 구레적인 구현이 아닌 서로 다른 클래스 간의 기능을
 * 공유하기 위해 사용됩니다
 *
 *
 * ⭐ 인터페이스와 추상 클래스의 차이점
 *
 * 인터페이스는 객체의 구조를 정의하는 데 사용됩니다. 즉, 객체가 가져야 하는 속성과 메서드의 이름과 타입을 정의합니다. 인터페이스는 클래스, 함수, 객체 등 다양한 타입에 적용할 수 있습니다. 인터페이스는 구현 코드를 가지지 않으며, 단지 타입 체크를 위한 용도로만 사용됩니다.
 *
 * 반면, 추상 클래스는 인터페이스와 비슷하지만, 구현 코드를 가질 수 있습니다. 추상 클래스는 인터페이스와 마찬가지로 객체의 구조를 정의하지만, 구현 코드를 가지므로 일부 메서드는 구현되어 있어야 합니다. 추상 클래스는 상속을 통해 사용되며, 자식 클래스에서 추상 클래스의 추상 메서드를 구현해야 합니다.
 *
 * => 인터페이스는 객체의 구조를 정의하는 데 사용되며, 추상 클래스는 객체의 구조를 정의하고 일부 메서드를 구현하는 데 사용됩니다.
 *
 * 추상 클래스는 구조와 실제 코드를 함께 작성할 수 있다!
 *
 * 인터페이스 내엔 public, private 등은 지정할 수 없지만
 * readonly는 가능하다
 *
 *  */

/**  */
// type Addfn = (num1: number, num2: number) => number;
interface Addfn {
  (num1: number, num2: number): number;
  // 매개변수: 리턴 타입
}
let add: Addfn;
add = (num1: number, num2: number) => {
  return num1 + num2;
};

/** name 속성을 입력했는지 확인할 수 있는 인터페이스
 * Named 기반의 모든 클래스가 문자열이어야 한다고 설정하고 싶지는 않은 경우,
 * 속성 이름 다음에 물음표를 추가하여 선택적 속성을 지정할 수 있습니다
 * outputName? : string
 *
 * => 타입스크립트는 이 속성이 이 인터페이스를 구현하는 클래스 내에 있지만
 * 반드시 그렇지는 않다고 인식하게 됩니다.
 *
 *
 * 선택적 속성은 클래스에서도 outputName?로 작성한다
 */
interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  // readonly name: string;
  // age: number;
  greet(phrase: string): void;
}

// Greetable와 같은 규칙을 가진다
// 상속과는 다르게 여러개의 인터페이스를 구현할 수 있다
// 상속은 하나의 클래스만 지정가능하지만
// 인터페이스는 쉼표로 구분하여 여러 개를 구현할 수 있다
class Person implements Greetable {
  name?: string;
  age = 30;

  constructor(name?: string) {
    // 선택적 요소로 표시하지 않으면 기본값이 없이 이름을 입력하지 않은 경우 
    // 인스턴스를 생성할 수 없다 (오류)
    if (name) {
      this.name = name;
    }
  }

  greet(phrase: string): void {
    if (this.name) {
      console.log(phrase + '' + this.name);
    } else {
      console.log('Hi!');
    }
  }
}

let user1: Greetable; // 인터페이스를 타입으로 사용할 수 있다
/*
user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + '' + this.name);
  },
};
*/

user1 = new Person();

user1.greet('Hi there - I am ');
console.log(user1);

/** 클래스가 greet 메소드를 가지고 있고 다른 클래스도 이를 가지고 있는 지 확인하고자 할 때 */
