// const userName = 'MAX';

// let age = 30;
// age = 20;

// var result;
// // function add(a: number, b: number) {
// //   result = a + b;
// //   return result;
// // }

// // const add2 = (a: number, b: number) => {
// //   return a + b;
// // };
// const add2 = (a: number, b: number = 1) => a + b;

// const printOutput = (output: string | number) => console.log(output);

// const button = document.querySelector('button');
// if (button) {
//   button.addEventListener('click', (event) => console.log(event));
// }

// printOutput(add2(5));

const hobbies = ['Sports', 'Cooking'];
console.log(hobbies[0]);

const activeHobbies = ['Hiking'];
activeHobbies.push(...hobbies);

console.log(activeHobbies);

const person = {
  firstName: 'Max',
  age: 30,
};

const copiedPerson = { ...person };
console.log(copiedPerson);

const add = (...numbers: number[]) => {
  return numbers.reduce((currentResult, currentValue) => {
    return currentResult + currentValue;
  }, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobbies, hobby1, hobby2, remainingHobbies);

const { firstName: userName, age } = person;
// userName은 별칭
console.log(userName, age);

