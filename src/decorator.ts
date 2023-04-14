// function Logger(logText: string) {
//     console.log('Decorator Factories Logger');
    
//     return function(constructor: Function) {
//         console.log(logText);
//         console.log(constructor);
//     }
// }

// function WithTemplate(template: string, hookId: string) {
//     console.log('Decorator Factories WithTemplate');
//     return function(constructor: any) {
//         console.log('Render something...');
//         const el = document.querySelector(`#${hookId}`)!
//         // el.innerHTML = template
//         el.innerHTML = new constructor().name
//     }
// }

// 构造返回值，使实例构造函数的时候执行 dom 渲染
function WithTemplate(template: string, hookId: string) {
    return function<T extends { new (...args: any[]): {name: string} }>(originConstructor: T) {

        return class extends originConstructor {
            constructor(...args: any[]) {
                super()
                const hookEl = document.querySelector(`#${hookId}`)!
                hookEl.innerHTML = template
                hookEl.querySelector('h1')!.textContent = this.name
            }
        }
    }
}

// @Logger('LOGGING - PERSON')
@WithTemplate('<h1>This my Project!</h1>', 'app')
class Person1 {
    name = 'Max';
    age = 20
    constructor() {
        console.log('Creating person object...');
    }
}
const person = new Person1()

// Property Decorator
function log1(target: any, propertyName: string | Symbol) {
    // target -> 构造函数原型
    // propertyName -> 'title'
    console.log('Properties Decorator');
    console.log(target, propertyName)
}

function log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor Decorator');
    console.log(target, name, descriptor)
}

function log3(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Method Decorator');
    console.log(target, name, descriptor);
}

function log4(target: any, name: string, position: number) {
    // position 参数所在索引
    console.log('Parameters Decorator');
    console.log(target, name, position);
    console.log(target === Product.prototype) // true 
}

function log5(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Static Method Decorator');
    // target 构造函数本身
    console.log(target, name, descriptor);
    console.log(target === Product.prototype.constructor) // true
}

class Product {
    @log1
    title: string;
    private _price: number

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    @log2
    set price(val: number) {
        if (val > 0) {
            this._price = val
        }
        throw new Error('Invalid price - should be positive')
    }

    get price() {
        return this._price
    }

    @log3
    getPriceWithTax(@log4 tax: number) {
        return this._price * (1 + tax)
    }

    @log5
    static getInstance() {

    }
}


function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            // 手动绑定this，这里this永远指向Printer实例
            return originalMethod.bind(this)
        }
    }
    return adjDescriptor
}

class Printer {
    message = 'This works!'

    @Autobind
    showMessage() {
        console.log(this.message)
    }
    changeMessage(msg: string) {
        this.message = msg
    }
}
const p = new Printer()
p.changeMessage('This new works!')
const button = document.querySelector('button')!
// 使用方法装饰器，指定方法在任何时候调用时，内部的this指向构造函数实例
button.addEventListener('click', p.showMessage)


// Decorator demo Validation
// we lib start
interface ValidatorConfig {
    // class name
    [property: string]: {
        // title / price (property name needed to validate)
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}
// 初始为空
// {
//     Course: {
//         price: ['positive'],
//         title: ['required'],
//     },
//     otherClass: {}
// }
const registeredValidators: ValidatorConfig = {}
// 向 registeredValidators 添加
function Required(target: any, propName: string) {
    const constructorName = target.constructor.name
    registeredValidators[constructorName] = {
        ...registeredValidators[constructorName],
        [propName]: ['required']
    }
}
function PositiveNumber(target: any, propName: string) {
    const constructorName = target.constructor.name
    const ruleKeys = registeredValidators[constructorName][propName] || []
    registeredValidators[constructorName] = {
        ...registeredValidators[constructorName],
        [propName]: [...ruleKeys, 'positive']
    }
}
function Min(limit: number) {
    return function(target: any, propName: string) {
        const constructorName = target.constructor.name
        const ruleKeys = registeredValidators[constructorName][propName] || []
        console.log(ruleKeys)
        registeredValidators[constructorName] = {
            ...registeredValidators[constructorName],
            [propName]: [...ruleKeys,  'min']
        }
    }
}
function validate(instance: any) {
    const validateConfigs = registeredValidators[instance.constructor.name]
    // console.log(validateConfigs)
    let isValid = true
    for(let propName in validateConfigs) {
        for(let ruleKey in validateConfigs[propName]) {
            switch (validateConfigs[propName][ruleKey]) {
                case 'required':
                    isValid = isValid && instance[propName].trim() !== ''
                    break
                case 'positive':
                    isValid = isValid && instance[propName] > 0
                    break
                case 'min':
                    isValid = isValid && instance[propName] > 10 // TODO replace 10 with param
            }
        }
    }
    console.log(isValid);
    return isValid
}
// we lib end

class Course {
    @Required
    title: string
    @PositiveNumber
    @Min(10)
    price: number
    constructor(t: string, p: number) {
        this.title = t
        this.price = p
    }
}
const courseForm = document.getElementById('form')! as HTMLElement
courseForm.addEventListener('submit', event => {
    event.preventDefault()
    const titleEl = document.getElementById('title')! as HTMLInputElement
    const priceEl = document.getElementById('price')! as HTMLInputElement
    
    const title = titleEl.value
    const price = +priceEl.value

    const course = new Course(title, price)
    if (!validate(course)) {
        console.log('Invalid Input, Please try again')
    } else {
        console.log(course)
    }
})