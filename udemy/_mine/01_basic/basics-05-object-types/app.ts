// person: object = {} 이 부분에서 어떠한 정보도 주지 않는 객체로 인식하므로 log를 찍어도 나오지 않는다
// 따라서 추론된 모든 것을 자동으로 입력할 수 있도록
// person: {} = {}로 입력한다
const person = {
  name: 'Maxim',
  age: 30,
};

console.log(person.name);
