## 2. Typescript Basics & Basic Types

### Working with Numbers, Strings & Booleans

### Type Assignment & Type Inferrence(类型推断)

### Object Types

### Arrays Types

### Working with Tuples

### working with Enums

### The any Type

### Union Types

### Literal Types

### Type Aliases Custom Types

```ts
type Combinable = number | string;
type ConversionDescriptor = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: ConversionDescriptor
) {}
```

### Function Return Types & void

### Function as Types

### Function Types & Callbacks

### The unknown Type

### The never Type

```ts
function generateError(code, msg): never {
  throw { code, msg };
  // return never
}
```

## 3. The TypeScript Compiler(and its Configuration)

### Using watch mode

### Compiling the Entire Project Multiple Files

### Including & Excluding Files

### Setting a Compilation Target

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "es5" // es6
  }
}
```

### Understanding Typescript Core Libs

```json
// tsconfig.json
{
  "compilerOptions": {
    // "lib": [] // lib有默认值，即下面的选项
    "lib": ["dom", "dom.iterable", "es6", "scripthost"]
  }
}
```

### More Configuration & Compilation Options

### Working with Source Map

### rootDir and outDir

### Stop Emitting Files on Compilation Errors

```json
// tsconfig.json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "noEmitOnError": false // default false: with error still emit files
  }
}
```

### Strict Compilation

### Code Quality Options

### Debugging with Visual Studio Code

## 4. Typescript & Modern Javascript / Using Next-Gen Javascript Syntax

### let and const

### Arrow Functions

### Default Function Parameters

### The Spread Operator(...)

```ts
const a = [1, 2];
const b = [0, ...b];
```

### Rest Parameters

```ts
function add(...numbers) {
  // numbers.reduce(...)
}
add(1, 4, 2.1, 3, 6);
```

### Array & Object Destructuring

## 5. Classes & Interfaces / Working with Objects

### What are Classes

### Creating a First Class

### Compiling to Javascript

es6 class
es5 构造函数

### Constructor Function & This this Keyword

### private and public Access Modifiers

private 只有在类中能访问
public

### Shorthand Initialization

### readonly Properties

### Inheritance

### Overriding Properties & The protected Modifier

基类中 protected 属性在继承类内部也可以访问

### Getter & Setter

### Static Methods & Properties

只能通过构造函数.xxx 访问，例如 Math.PI / Math.pow

### Abstract Classes

抽象属性/方法必须在抽象类中存在，并且继承抽象类的继承类要有抽象属性或方法的具体实现
抽象类不能实例化

### Singletons & Private Constructors

### A First Interface

an interface describes the structure of an object
a powerful feature to force you classes or objects to have a certain structure
and to clearly describe you idea of how an object should look like

### Using Interfaces with Classes

### Why Interfaces

### Readonly interface Properties

### Extending Interface

## 6. Advanced Types

### Intersection Types

交叉类型

### More on Type Guards

类型保护 type class
type guards is just a term that describes the idea or approach of checking if a certain property or mehtod exists before you try to use it

### Discriminated Unions

可辨识联合

```ts
interface Bird {
  type: "bird";
  flyingSpeed: number;
}
interface Horse {
  type: "horse";
  runningSpeed: number;
}
type Animal = Bird | Horse;
function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
  }
  console.log("Moveing...", speed);
}
const bird: Bird = { type: "bird", flyingSpeed: 10 };
const horse: Horse = { type: "horse", runningSpeed: 20 };
moveAnimal(bird);
moveAnimal(horse);
```

### Type Casting

```ts
// const input = <HTMLInputElement>document.querySelector('#input-out')
// const input = document.querySelector('#input-out')! as HTMLInputElement

const input = document.querySelector("#input-out");
if (input) {
  (input as HTMLInputElement).value = "Hi there!";
  // (<HTMLInputElement>input).value = 'Hi there!'
}
```

### Index Properties

```ts
interface ErrorContainer {
  [prop: string]: string;
}
const errorBag: ErrorContainer = {
  email: "Not a valid email",
  username: "Must start with a capital character",
};
```

### Function Overloads

```ts
function add1(a: number, b: number): number;
function add1(a: string, b: string): string;
function add1(a: number, b: string): string;
function add1(a: string, b: number): string;
function add1(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}
```

### Optional Chaining

?.

### Nullish Coalescing

??

## 7. Generics

泛型 提供灵活性和类型安全性
we're flexble regarding the values we pass in or we use in a class
regarding: 关于

### Built-in Generics & What are Generics

### Creating a Generic Function

### Working with Constraints

类型约束 extends

```ts
function merge<T extends object, U extends object>(obj1: T, obj2: U) {
  return Object.assign(obj1, obj2);
}
const object = merge({ name: "Max" }, { age: 20 });
```

### Another Generics Function

```ts
interface lengthy {
  length: number;
}
function countAndDescribe<T extends lengthy>(element: T): [T, string] {
  let describeText = "Got no value";
  if (element.length >= 1) {
    describeText = "Got " + element.length + " value";
  }
  return [element, describeText];
}
console.log(countAndDescribe("123"));
console.log(countAndDescribe(["Sporting", "Cooking"]));
```

### The keyof Constraint

### Generic Classes

Partial
Readonly

### Generic Types vs Union Types

Generic 锁定一种类型，使用相同的类型，在整个类/函数中
Union 每次使用其中的一种类型

## Decorator 装饰器

### A First Class Decorator

装饰器在定义类的时候执行，并不是实例化构造函数时

### Working with Decorator Factories

### Building More Useful Decorators

### Add Multiple Decorators

装饰器工厂函数按照代码 自上而下 顺序执行
装饰器按照 自下而上 顺序执行

### Diving into Property Decorators

在定义类的时候执行

### Accessor & Method & Parameter Decorator

在定义类的时候执行
ts 会忽略属性/参数装饰器中的返回值

### When Do Decorators Execute

### Returning (and changing) a Class in a Class Decorator

### Other Decorator Return Types

### Example Creating an Autobind Method Decorator

### Validation with Decorators - First step

### Validation with Decorators - Finished

```ts
// Decorator demo Validation
// we lib start
interface ValidatorConfig {
  // class name
  [property: string]: {
    // title / price (property name needed to validate)
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}
// 初始为空
// {
//     Course: {
//         price: ['positive'],
//         title: ['required'],
//     },
//     otherClass: {}
// }
const registeredValidators: ValidatorConfig = {};
// 向 registeredValidators 添加
function Required(target: any, propName: string) {
  const constructorName = target.constructor.name;
  registeredValidators[constructorName] = {
    ...registeredValidators[constructorName],
    [propName]: ["required"],
  };
}
function PositiveNumber(target: any, propName: string) {
  const constructorName = target.constructor.name;
  const ruleKeys = registeredValidators[constructorName][propName] || [];
  registeredValidators[constructorName] = {
    ...registeredValidators[constructorName],
    [propName]: [...ruleKeys, "positive"],
  };
}
function Min(limit: number) {
  return function (target: any, propName: string) {
    const constructorName = target.constructor.name;
    const ruleKeys = registeredValidators[constructorName][propName] || [];
    console.log(ruleKeys);
    registeredValidators[constructorName] = {
      ...registeredValidators[constructorName],
      [propName]: [...ruleKeys, "min"],
    };
  };
}
function validate(instance: any) {
  const validateConfigs = registeredValidators[instance.constructor.name];
  // console.log(validateConfigs)
  let isValid = true;
  for (let propName in validateConfigs) {
    for (let ruleKey in validateConfigs[propName]) {
      switch (validateConfigs[propName][ruleKey]) {
        case "required":
          isValid = isValid && instance[propName].trim() !== "";
          break;
        case "positive":
          isValid = isValid && instance[propName] > 0;
          break;
        case "min":
          isValid = isValid && instance[propName] > 10; // TODO replace 10 with param
      }
    }
  }
  console.log(isValid);
  return isValid;
}
// we lib end

class Course {
  @Required
  title: string;
  @PositiveNumber
  @Min(10)
  price: number;
  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}
const courseForm = document.getElementById("form")! as HTMLElement;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title")! as HTMLInputElement;
  const priceEl = document.getElementById("price")! as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const course = new Course(title, price);
  if (!validate(course)) {
    console.log("Invalid Input, Please try again");
  } else {
    console.log(course);
  }
});
```
