// // const names: Array<string> = []

// // // names[0].split(' ')

// // const promise: Promise<string> = new Promise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve('This is done')
// //     }, 1000)
// // })
// // promise.then(res => {
// //     res.split('')
// // })

// // function merge(obj1: object, obj2: object) {
// //     return Object.assign(obj1, obj2)
// // }

// // function merge<T extends object, U extends object>(obj1: T, obj2: U) {
// //    return Object.assign(obj1, obj2);
// // }
// // const object = merge({name: 'Max'}, {age: 20})
// // object.name

// // interface lengthy {
// //     length: number
// // }
// // function countAndDescribe<T extends lengthy>(element: T): [T, string] {
// //     let describeText = 'Got no value';
// //     if (element.length >= 1) {
// //         describeText = 'Got ' + element.length + ' value';
// //     }
// //     return [element, describeText]
// // }
// // console.log(countAndDescribe('123'))
// // console.log(countAndDescribe(['Sporting', 'Cooking']))

// // function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
// //     return 'Value: ' + obj[key]
// // }
// // extractAndConvert({name: ''}, 'name')

// // Generic Classes

// class DataStorage<T extends string | number | boolean> {
//     private data: T[] = []

//     addItem(item: T) {
//         this.data.push(item)
//     }
//     removeItem(item: T) {
//         const index = this.data.indexOf(item)
//         if(index !== -1) {
//             this.data.splice(index, 1)
//         }
//         return
//     }
//     getItems() {
//         return [...this.data]
//     }
// }
// const stringStorage = new DataStorage<string>()
// stringStorage.addItem('Max')
// stringStorage.addItem('Menu')
// stringStorage.removeItem('Max')
// console.log(stringStorage.getItems()) // ['Menu']

// const numberStorage = new DataStorage<number>()
// numberStorage.addItem(1000)
// numberStorage.addItem(2000)
// numberStorage.removeItem(2000)
// console.log(numberStorage.getItems()) // [1000]

// interface Course {
//     title: string;
//     describe: string;
// }

// function createCourseGoal(title: string, describe: string): Course {
//     let course: Partial<Course> = {}
//     course.title = title
//     course.describe = describe
//     return course as Course
// }

// const names: Readonly<string[]> = ['Max', 'Menu']
// // names.push('Min')
// // names.pop()