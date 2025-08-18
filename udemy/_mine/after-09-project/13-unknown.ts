// 알 수 없는 타입

let userInput: unknown; // any와는 다른 타입
// 에러발생 없이 어떤 값이든 저장할 수 있다
let userName: string;

userInput = 6;
userInput = 'Max';

// userName = userInput;
// unknown은 string 타입이 아니다
// any로 변경하면 추측으로 string 타입으로 인식해서
// 에러가 사라진다

/**
 * unknown을 사용하는 경우 userInput에 현재 저장된 타입을
 * 확인해야 문자열을 원하는 변수에 저장할 수 있습니다
 * 따라서, 타입 검사를 할 수 있다
 * => unknown이 any보다 나음
 */
if (typeof userInput === 'string') {
  userName = userInput;
}
