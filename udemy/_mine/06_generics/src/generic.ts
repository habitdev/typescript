// 보통 제너릭 타입 하나만 사용한다면 T(type)를 입력하면 된다
// 그 다음 타입을 이 함수 내에서 사용할 수 있도록 입력하면 되므로
// objA: object를 objA: T로 입력한다
// 보통 두번째 매개변수는 알파벳 순서에 따라 U를 입력한다
// 제너릭 타입은 T와 U가 서로 다른 타입이 될 수 있다록 타입스크립트에 알려줄 수 있으므로 다양한 타입 데이터를 얻고자 하는 것을
// 타입스크립트가 알게 해준다

// Object.assign:  출처 객체들의 모든 열거 가능한 자체 속성을 복사해 대상 객체에 붙여넣습니다. 그 후 대상 객체를 반환합니다.
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
// 에러 나..ㅠㅜㅠㅜㅠㅜ
// T extends object로 수정

// console.log(merge({ name: 'Max' }, { age: 30 }));
const mergedObj = merge<{ name: string; hobbies: string[] }, { age: number }>({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
const mergedObj2 = merge<{ name: string }, { age: number }>({ name: 'Max' }, { age: 30 });
// mergedObj.name; // 오류
// 제너릭 타입이 없는 경우 타입스크립트는 mergedObj가 name을 가지고 있는 것을 모르기 때문이다
// const mergedObj2 = merge<{ name: string }, { age: number }>({ name: 'Max' }, 30);
// 위와 같이 작성하면 새로운 객체로 합쳐지지 않는다
// 따라서, 객체의 정확한 구조도 상관하지 않겠다고 입력해야 한다
// T와 U는 항상 객체여야 한다
// T와 U의 제네릭 타입 제한 -> 제한하고자 하는 타입 다음에
// extends를 입력
// 굳이 제한을 하지 않아도 되는 경우 유연하게 놔둔다

console.log(mergedObj.age);

/**
 * 다른 일반 함수
 * 매개변수는 원하는대로 지정해도 되지만 제너릭 타입이어야 한다
 * (어떤 타입이어도 상관 없기 때문이다)
 *
 */

// length가 불명확하다고 나오는 것을 방지하기 위해 명확하게 interface를 사용하여 명시한다
interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionTxt = 'Got no value';
  if (element.length === 1) {
    // length가 불명확하다고 오류가 난다
    descriptionTxt = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionTxt = 'Got ' + element.length + ' elements';
  }
  return [element, descriptionTxt];
}

// console.log(countAndDescribe(['Sports', 'Cooking'])); // 동작
// console.log(countAndDescribe([])); // 동작
// console.log(countAndDescribe(10)); // 오류 -> 숫자는 length 속성을 지니지 않기 때문이다

console.log(countAndDescribe(['Sports', 'Cooking']));

/**
 *
 * keyof" 제약조건:
 *
 */

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

// extractAndConvert({}, 'name'); // 오류
// U는 모든 T타입의 키어야 하는데 여기선
// name이라는 키를 가진 object가 없기 때문에 오류가 난다
extractAndConvert({ name: 'Max' }, 'name');

/**
 * 제너릭 클래스:
 * 균일한 데이터가 되도록하여 문자열이나 숫자나 객체가 되도록
 * 제너릭 클래스로 작성한다
 *
 */

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
    // 1) 원시 값이 아닌 요소로 수행한 작업이 좋지는 않다
    // 따라서, 객체나 배열로 작업ㅇ르 하는 경우 객체를 전달하면 indexOf는 작동하지 않는다
    // {name: 'Max'}은 새로운 객체이기 때문이다

    // 자바스크립트가 아무것도 찾지 못한다면 indexOf가 -1을 반환한다
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max'); // string만 들어갈 수 있도록 설정했기 때문에 string만 적는다
textStorage.addItem('Manu');
textStorage.removeItem('Max');

console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
// 다양한 타입을 지정하여 여러 개의 DataStorage를 만들 수 있다
// 유연하다

/* 
// 객체 입력 
const objStorage = new DataStorage<object>();
const maxObj = { name: 'Max' };
objStorage.addItem(maxObj);
objStorage.addItem({ name: 'Manu' });
// ...

objStorage.removeItem(maxObj);
console.log(objStorage.getItems());
*/

// 자바스크립트의 객체는 참조 타입으로 {name: 'Max'}를 제거해도
// log에 {name: 'Max'}가 나온다
// 1)번 설명으로..

// 위의 objStorage.addItem({ name: 'Max' });와 objStorage.removeItem({ name: 'Max' });은 메모리에 있는 완전히 새로운 객체이므로 주소를 지니지 않아 작동하지 않는다
// 따라서, 배열의 마지막 요소를 식별할 수 없으므로 항상 마지막 요소가 제거된다
// => 'Max'가 아닌 'Manu' 제거
// 해결법:
// 1. item을 찾았는지 확인하는 것
// 2. 정확히 같은 객체를 참조한다
// objStorage.addItem({ name: 'Max' });가 아니라 변수를 만들어 할당한다.

// 그러므로 이런 경우 객체가 아닌 다른 타입들만 저장이 가능하도록 제너릭 타입을 설정해준다...

/** 보너스 개념) 제너릭 유틸리티 타입
 * ❗타입스크립트에만 존재한다
 *
 * - Partial:
 * 우리가 만든 타입 전체의 모든 속성을 선택적인 타입으로 바꾼다
 * 따라서, 중괄호 쌍을 빈 객체로 설정하여 단계적으로 모든 요소를 추가할 수 있다
 * 유일한 문제는 이를 반환할 수 없다는 것
 * => CourseGoal의 Partial 타입이지 CourseGoal이 아니기 때문
 * => 이는 return 시 courseGoal을 CourseGoal로 형 변환하여 해결할 수 있다
 *
 *
 * - Readonly:
 *
 *
 */

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  // 빈 객체로 두면 아래에 속성을 대입 시 에러가 나므로
  // CourseGoal로 타입을 설정한다
  // 객체가 CourseGoal이 되는 객체임을 알려준다

  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;

  return courseGoal as CourseGoal;
  // 이 시점에선 모든 항목에 데이터가 추가되어 CourseGoal이 된다

  // return { title: title, description: description, completeUntil: date };
}

const namesArr: Readonly<string[]> = ['Max', 'Anna'];
// namesArr.push('Manu');
// Readonly를 붙임으로서 배열을 조작할 수 없게 됨
