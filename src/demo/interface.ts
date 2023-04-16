// // type AddFn = (a: number, b: number) => number
// // 接口定义函数类型
// interface AddFn {
//     (a: number, b: number): number
// }

// let add: AddFn
// add = (n1: number, n2: number) => n1 + n2

// interface Named {
//     readonly name: string;
// }
// // 接口继承，可继承多个，用逗号分开
// interface Greetable extends Named {
//     // readonly name: string;
//     // age: number;
//     greet(phrase: string) : void
// }

// // 类实现接口
// class Person implements Greetable {
//     name: string
//     constructor(n: string) {  
//         this.name = n
//     }
//     greet(phrase: string): void {
//         console.log(phrase + ' ' + this.name)
//     }
// }

// let user1: Greetable
// user1 = {
//     name: 'Wxh',
//     // age: 20,
//     greet(phrase: string) {
//         console.log(phrase + ' ' + this.name)
//     }
// }
// user1.greet('Hi, I am')

// const user2 = new Person('Max')
// user2.greet('Hi, I am')
// user2.name = 'Min'