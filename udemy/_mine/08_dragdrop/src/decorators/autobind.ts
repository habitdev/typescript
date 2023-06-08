// namespace App {
  // auto bind decorator
  export function AutoBind(_: any, _2: string, decorator: PropertyDescriptor) {
    const originalMethod = decorator.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,

      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
// }
