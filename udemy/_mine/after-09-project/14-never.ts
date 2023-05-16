/** never */
let userInput: unknown; // any와는 다른 타입
let userName: string;

userInput = 6;
userInput = 'Max';

if (typeof userInput === 'string') {
  userName = userInput;
}

function generateError(msg: string, code: number): never {
  throw { message: msg, errorCode: code };
}
// 이 함수는 void지만 반환을 안하는 것은 아니다
// never를 반환하며 반환 값을 생성하지 않습니다
// 함수가 항상 예외를 throw하거나 while(true)와 같은 무한 루프를 가지고 있을 때 사용됩니다.

const result = generateError('An error occrred!', 500);
console.log(result);
// log가 출력되지 않는다
// 왜냐하면 generateError에서 스크립트와 충돌하여
// 스크립트가 취소되기 때문입니다
// 이런 경우엔 never타입을 사용하는 것은 좋지 않다
