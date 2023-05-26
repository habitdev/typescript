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
