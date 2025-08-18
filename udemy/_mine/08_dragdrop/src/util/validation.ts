// namespace App {
   // validate
  export interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number; // 문자열 길이 검사
    maxLength?: number; // 문자열 길이 검사
    min?: number; // 숫자의 값 검사
    max?: number; // 숫자의 값 검사
    // ?를 뒤에 붙인 항목은 선택사항이다
  }

  export function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    // null로 느슨한 비교를 하면 undefined도 같이 걸러진다
    // null == undefined (true), null === undefined (false)
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }

    return isValid;
  }
// }