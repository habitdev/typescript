// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;

// enum : 사용자 지정 타입
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
// 시작 index를 바꾸고 싶으면 등호를 사용하여 숫자를 할당한다

const person = {
  name: 'Maxim',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN,
};


// any타입은 단점이 너무 커서 사용하지 않는 걸 권장한다
// any타입을 사용한다면 바닐라 자바스크립트와 다른 점이 없다
// 정말 어떤 타입이 들어올 지 모르는 경우 혹은 런타임 검사를 할 경우에 
// 작업의 범위를 좁히기 위해 any를 사용하면 된다