// Code goes here!

import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

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
