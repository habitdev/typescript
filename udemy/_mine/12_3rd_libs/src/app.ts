// Code goes here!
/**
 * lodash는 자바스크립트로 빌드되므로 사용하려면
 * 타입스크립트가 인식할 수 있도록 
 * npm install --save-dev @types/lodash을 설치 후
 * npm i --save lodash 을 설치한다
 * 
 * 
 * => @types 패키지로 다른 라이브러리도 변환해서 사용한다
 * ex) @types/jquery
 * 
 */

import _ from 'lodash';

console.log(_.shuffle([1, 2, 3]));
