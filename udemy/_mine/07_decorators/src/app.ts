/**
 * 데코레이터: 메타 프로그래밍(metaprogramming)에 유용한 함수이다
 *
 * 메타 프로그래밍: 엔드 유저가 페이지를 방문하는데, 보통 곧바로 영향을 주기에
 * 데코레이터를 사용하지 않습니다
 * 대신에 코드를 쓰는 데 적합하도록 만들어
 * 데코레이터를 다른 개발자들이 사용하기 쉽게 하는 것
 *
 * experimentalDecorators가 true로 설정되어 있어야 한다
 *
 * 데코레이터는 보통 클래스들에 적용된다
 * - 데코레이터는 인수를 받는다
 * - 데코레이터는 실체화되기 전 클래스가 정의만 돼도 실행된다
 *
 */

// 클래스 통째에 적용되는 데코레이터
function Logger(logstring: string) { 
  return function (constructor: Function) {
    // 새 함수를 반환하는 함수로 변경
    console.log(logstring);
    console.log(constructor);
  };
}
@Logger('LOGGING - PERSON') // @은 특별한 식별자
// 데코레이터 함수를 실행하려는 게 아니라 데코레이터 함수와 같은 걸 반환해 줄 함수를 실행하는 것
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

// Person울 실체화하지 않아도 데코레이터(Logger)는 실행된다
const pers = new Person();
console.log(pers);

/**
 * 데코레이터를 만드는 대신, 데코레이터 팩토리(factory)를 정의할 수 있다
 * 데코레이터 함수를 도출하는데 어떤 대상에 데코레이터를 할당할 때 설정할 수 있도록 해준다
 */
