console.log('code...');

/**
 * 타입스크립트 사용하기
 * [타입의 종류]
 * 1. number ( 정수형X, 실수형X )
 * 2. string: 문자열('', "", ``)
 * 3. boolean: true, false
 *
 *
 */

function add(num1: number, num2: number, showResult: boolean, phrase: string) {
  const result = num1 + num2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return num1 + num2;
  }
}

let number1: number; // 값을 지정하지 않았을 경우 타입을 입력해준다
number1 = 5;
const number2 = 2.8;
const printResult = true;
let resultPhrase = 'Result is: '; // resultPhrase의 타입은 string으로 추론된다
// resultPhrase = 0; // string이 아니므로 에러

const result = add(number1, number2, printResult, resultPhrase);
console.log(result);
