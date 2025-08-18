function add(num1: number, num2: number) {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log('Result : ' + num);
}

// void는 값을 반환하는 함수가 없고 실제 반환되는 값이 없을 경우
// 값을 반환하지 않는 함수의 기본 타입
// undefined는 값을 반환하는 함수가 있으나 실제 값을 반환하지 않을 때 사용



console.log(printResult(add(5, 12)));
 
