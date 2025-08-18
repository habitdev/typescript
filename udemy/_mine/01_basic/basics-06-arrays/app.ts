const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Maxim',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: [2, 'author'],
  // 튜플은 항상 2개의 요소만 가져야 한다⭐
  // 첫번째 요소는 식별자, 두번째 요소는 항상 설명(문자열)이어야 한다
  // 단점은 코드를 실행할 수 있다는 점이다
};
let favoriteActivities;
// favoriteActivities = 'Sports' // error
// favoriteActivities = ['Sports', 1] // 숫자로 인해 error
// 만약 타입을 여러가지 사용하고 싶다면 any 타입으로 선언한다
// let favoriteActivities: any[];
// any는 유용하지만 사용하지 않는 게 더 장점이 많다

person.role.push('admin');
// person.role[1] = 10;
// 타입스크립트는 튜플이 맞지 않는 형식으로 입력되는 것을 모른다
// 따라서 person에 정의를 입력한다
// push는 타입스ㅡ립트가 모르기 때문에 주의해야한다

// person.role[1] = 10; // error

console.log(person);
console.log(person.name);
for (const role of person.role) {
  console.log(role);
}
