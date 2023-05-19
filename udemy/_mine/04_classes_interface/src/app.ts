/**
 *
 * 객체는코드로 작업을 수행하면서 사용할 수 있는 구체적인 요소들,
 * 데이터를 저장하고 메소드를 실행하기 위해 메소드를 저장하는 데
 * 사용하는 데이터 구조
 *
 * 클래스란?
 * 객체의 청사진
 * 클래스를 사용하여 객체의 형태. 포한해야 하는 데이터, 클래스를 기반으로
 * 객체를 쉽게 만들수 있으려면 어떤 메소드가 필요한지 정의할 수 있기
 * 때문에 이를 클래스 내의 인스턴스라고 부릅니다
 *
 * 따라서, 객체는 클래스 내의 인스턴스❗
 *
 * 이라한 클래스를 기반으로 하면 동일한 구조, 동일한 클래스를 기반으로 하는
 * 동일한 메소드로 여러 객체를 빠르게 복제할 수 있습니다
 *
 * => 클래스는 객체의 형태, 포함해야 할 속성괴 메소드를 정의하는 데 도움이 됩니다
 * => 클래스는 객체의 생성 속도를 높여주며 객체 리터럴 표기법을 사용하는 것에
 * 대한 대안입니다
 *
 * 값이 다를 뿐 일반적인 구조는 같게 되는 것
 *
 *
 *  */

abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {
    // this.name = id;
    // this.name = name;
  }

  // 정적 메소드로 만드려면 앞에 정적 키워드를 추가한 다음
  // 객체를 반환해야 합니다
  static createEmployee(name: string) {
    return {
      name: name,
    };
  }

  // abstract: 함수를 만들어만 놓고 상세한 내용은 각 클래스에서 하도록 한다
  // 함수가 abstract라면 이를 가지고 있는 클래스에도 abstract를 붙인다
  // 그리고 중괄호는 없어야 하며
  // 보유해야 하는 타입을 추가하지 말고 반환하도록 해야 한다
  abstract describe(this: Department): void;
  /*
  abstract describe(this: Department) {
    console.log(`Department(${this.id}): ${this.name}`);
  }
*/
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    // console.log(this.employees.length);
    console.log(this.employees);
    // console.log(Department.fiscalYear);
  }
}

// ## 상속
class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, 'IT');
  }

  describe() {
    console.log('IT Department - ID: ' + this.id);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  // getter는 값을 가지고 올 때 함수나 메소드를 실행하는 속성
  // 개발자가 더 복잡한 로직을 추가할 수 있게 한다
  // getter 메소드는 반드신 반환을 해야 한다
  // getter & setter : 로직을 캡슐화하고 속성을 읽거나 설정하려 할 때
  // 실행되어야 하느 ㅈ추가적인 로직을 추가하는 데 유용
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }

    throw new Error('No report found.');
  }

  // setter: 인자를 설정해야 하므로 매개변수를 입력한다
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!');
    }
    this.addReport(value);
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  describe() {
    console.log('Accounting Department - ID: ' + this.id);
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }

    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }
  printReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee('Max');
console.log(employee1, Department.fiscalYear);

const accountingIt = new ITDepartment('d1', ['MAX']);

accountingIt.addEmployee('Max');
accountingIt.addEmployee('Manu');

accountingIt.describe();
accountingIt.printEmployeeInformation();
console.log(accountingIt);

const accounting = new AccountingDepartment('d2', []);
accounting.mostRecentReport = 'Year End Report';
console.log(accounting.mostRecentReport);
// 메소드로서 실행하는 게 아니라 일반 속성처럼 접근하므로 괄호쌍 없이 입력한다
// accounting.mostRecentReport() (X)
// report가 없으면 에러가 발생한다

accounting.addReport('Someting went wrong....');
accounting.addEmployee('Manu');
// accounting.printReports();
// accounting.printEmployeeInformation();

accounting.describe();

// 정적 속성과 메소드
/**
 * 클래스의 인스턴스에서 접근할 수 없느 속성과 메소드를
 * 클래스에 추가할 수 있다
 *
 * 새 클래스 이름을 먼저 호출하지 않고 클래스에 직접 접근하는 것
 *
 * 주로 논리적으로 그룹화하거나 클래스에 매핑하려는 유틸리티 함수나
 * 클래스에 저장하고자 하는 전역 함수에 사용된다
 */
