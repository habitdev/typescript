// Code goes here!

import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';

/// <reference path="models/drag-drop.ts" /> //
/// <reference path="models/project.ts" /> //
/// <reference path="state/project-state.ts" /> //
/// <reference path="util/validation.ts" /> //
/// <reference path="decorators/autobind.ts" /> //
/// <reference path="components/project-list.ts" /> //
/// <reference path="components/project-item.ts" /> //
/// <reference path="components/project-input.ts" /> //

// 자바스크립트에서는 project 클래스 혹은 constructor 기능을 찾을 수 없다
// tsconfig.json 파일에서 outFile의 주석을 해제해 타입스크립트가 네임스페이스와 연결되도록 한다
// => 컴파일 중에 연결되는 참조들을 하나의 자바스크립트 파일로 연결한다
// =>  "module": "commonjs" 를 "amd"로 변경한다

// 슬래시가 세개의 특수 코멘트는 타입스크립트가 참조처럼 이해하는 특수구문이다
// 임포트 된 파일로 부터 사용하고자 하는 무언가를 동일한 네임스페이스에 집어 넣어야 한다
// ex) 네임 스페이스의 이름: App일 경우
// namespace App {
new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
// }



/**
 * 
 * 네트워크에서 모든 파일을 한번씩 요청해야 하므로
 * 이를 하나로 묶는 것이 효율적이다 따라서, 웹팩을 사용한다
 * => http 요청의 양을 줄이는 것을 도와준다
 * https://webpack.kr/concepts/
 */
// npm install --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader

// ts-loader는 웹팩에게 어떻게 코드를 자바스크립트로 변환할 것인지를 전달한다

// webpack.config.js에 설정을 입력하는데 
// output의 path는 에러가 나지 않게 하기 위해 tsconfig와 같은 경로여야 한다
// 경로는 절대경로이다

// path는 nodejs에서 제공하는 require 기능으로 가져온다
// const path = require('path');
// path.resolve(__dirname, 'dist')

// 타입스크립트로 뭘 할지 웹팩에게 전달하기 위해선 새로운 entry를 추가해야 한다(module 속성)


console.log('Hi!');
