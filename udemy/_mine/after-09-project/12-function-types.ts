function add(num1: number, num2: number) {
  return num1 + num2;
}

function printResult(num: number): void {
  console.log('Result : ' + num);
} 

function addAndHandle(num1: number, num2: number, callback: (num: number) => void) {
  const result = num1 + num2;
  callback(result)
}

let combineValues: (input1: number, input2: number) => number; // 매개변수는 일치하지 않아도 된다

combineValues = add;
// combineValues = printResult; // combineValues을 number로 지정하면 error
// combineValues = 5; // error
console.log(combineValues(8, 8));
addAndHandle(10,20, (result) => {
  console.log(result);

  return result; 
  // callback 타입을 지정 시 여기서 반환되는 값으로는
  // 아무작업도 수행하지 않는다고 callback 타입에 명확히 
  // 정의되어 있어 return을 해도 아무 문제가 없다
})


