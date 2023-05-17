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

// 키와 값의 type을 정의한다
class Department {
  // private id: string;
  // private name: string;
  private employees: string[] = [];

  // name은 public이어야 하는데
  // 이는 동일한 이름으로 속성을 만들고 싶다는 것을
  // 타입스크립트에게 알리는 명시적인 명령이기 때문이다
  constructor(private id: string, public name: string) {
    // this.name = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('d1', 'Accounting');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.describe();
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'Dummy', describe: accounting.describe };
// accountingCopy.describe(); // undefined
// 그 이유는 이 클래스나 정의된 특정 클래스를 기반으로 하지 않고
// 더미 객체로서 describe을 생성했기 때문이다
