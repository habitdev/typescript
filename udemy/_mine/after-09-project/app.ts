function add(num1: number, num2: number) {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log('Result : ' + num);
} 

let combineValues: (input1: number, input2: number) => number; // 매개변수는 일치하지 않아도 된다

combineValues = add;
// combineValues = printResult; // combineValues을 number로 지정하면 error
// combineValues = 5; // error
console.log(combineValues(8, 8));
