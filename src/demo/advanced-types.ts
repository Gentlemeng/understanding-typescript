// type a = {
//     name: string,
//     quanli: string[]
// }

// type b = {
//     name: string
// }

// type c = a & b
// const user: c = {
//     name: 'c',
//     quanli: ['看大门']
// }

// type d = number | string
// type e = number | boolean

// type f = d & e
// const n: f = 1

// type Combinable = number | string
// type Numeric = number | boolean
// type Universal = Combinable & Numeric

// // Function Overloads
// function add1(a: number, b:number): number;
// function add1(a: string, b:string): string;
// function add1(a: number, b:string): string;
// function add1(a: string, b:number): string;
// function add1(a: Combinable, b: Combinable) {
//     if (typeof a === 'string' || typeof b === 'string') {
//         return a.toString() + b.toString();
//     }
//     return a + b;
// }
// const result = add1('Max', 'Schwarz')
// const result1 = add1(1, 1)
// // result.toString()

// // interface Bird {
// //     type: "bird";
// //     flyingSpeed: number;
// // }
// //   interface Horse {
// //     type: "horse";
// //     runningSpeed: number;
// //   }
// //   type Animal = Bird | Horse;
// //   function moveAnimal(animal: Animal) {
// //     let speed;
// //     switch (animal.type) {
// //       case "bird":
// //         speed = animal.flyingSpeed;
// //         break
// //       case "horse":
// //         speed = animal.runningSpeed;
// //     }
// //     console.log("Moveing...", speed);
// //   }
// //   const bird: Bird = { type: "bird", flyingSpeed: 10 };
// //   const horse: Horse = { type: "horse", runningSpeed: 20 };
// //   moveAnimal(bird)
// //   moveAnimal(horse)

// // // Type Coasting 两种方式
// // // const input = <HTMLInputElement>document.querySelector('#input-out')
// // // const input = document.querySelector('#input-out')! as HTMLInputElement

// // const input = document.querySelector('#input-out')
// // if (input) {
// //     (input as HTMLInputElement).value = 'Hi there!'
// //     // (<HTMLInputElement>input).value = 'Hi there!'
// // }

// // // Index Properties
// // interface ErrorContainer {
// //     [prop: string]: string
// // }
// // const errorBag: ErrorContainer = {
// //     email: 'Not a valid email',
// //     username: 'Must start with a capital character'
// // }

