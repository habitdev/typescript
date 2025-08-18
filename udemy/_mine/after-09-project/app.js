/** never */
var userInput; // any와는 다른 타입
var userName;
userInput = 6;
userInput = 'Max';
if (typeof userInput === 'string') {
    userName = userInput;
}
function generateError(msg, code) {
    throw { message: msg, errorCode: code };
}
// 이 함수는 void지만 반환을 안하는 것은 아니다
// never를 반환하며 반환 값을 생성하지 않습니다
var result = generateError('An error occrred!', 500);
console.log(result);
// log가 출력되지 않는다
// 왜냐하면 generateError에서 스크립트와 충돌하여
// 스크립트가 취소되기 때문입니다
