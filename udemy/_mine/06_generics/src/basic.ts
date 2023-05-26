/**
 * 제너릭:
 * 타입스크립트에만 있고 바닐라 자바스크립트에는 없다
 * 다른 프로그래밍 언어에도 있는 개념
 * 다른 타입과 연결되는 종류인데 그게 어떤 타입인지는 상관 없다
 *
 * 1. generic functions & classes
 * 2. constraints
 * 3. special typescript types
 */

// const names:Array = ['Max', 'Manu'];
// 에러
// 제너릭 타입으로 1개의 argument가 있어야 한다
const names = ['Max', 'Manu'];
const names2: Array<string> = []; // string[]
// names2[0].split(' ');

// Array는 저장하는 요소가 어떤 것인지는 상관하지 않으나
// 정보가 저장되는 것인지에 대해서는 확인한다.
// 아무것도 입력하지 않더라도
// const names: any[] = [];로 라도 설정하는 것이 낫다

// Promise는 자바스크립트 기능이라 타입스크립트는 지원하지 않는다
// resolve, reject는 브라우저에서 두 함수를 자동으로 전달합니다
// Promise<string> : 프로미스가 문자열을 반환할 것이다
const promise: Promise<string> = new Promise((resolve /*reject*/) => {
  setTimeout(() => {
    resolve('This is done!');
  }, 2000);
});

// 제너릭 타입을 지정하지 않으면 메소드를 호출할 수 없다
promise.then((data) => {
  data.split(' ');
});
