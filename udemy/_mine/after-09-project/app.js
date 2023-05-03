function add(num1, num2) {
    return num1 + num2;
}
function printResult(num) {
    console.log('Result : ' + num);
}
var combineValues;
combineValues = add;
// combineValues = printResult; // combineValues을 number로 지정하면 error
// combineValues = 5; // error
console.log(combineValues(8, 8));
