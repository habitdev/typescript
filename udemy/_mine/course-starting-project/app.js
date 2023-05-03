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
function add(num1, num2, showResult, phrase) {
    var result = num1 + num2;
    if (showResult) {
        console.log(phrase + result);
    }
    else {
        return num1 + num2;
    }
}
var number1 = 5;
var number2 = 2.8;
var printResult = true;
var resultPhrase = 'Result is: ';
var result = add(number1, number2, printResult, resultPhrase);
console.log(result);
