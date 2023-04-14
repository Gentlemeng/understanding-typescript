abstract class Department {
    // private id: string
    // name: string
    // private employees: string[] = []
    protected employees: string[] = []
    
    constructor(protected readonly id: string, private name: string) {}

    // describe() {
    //     console.log(`Department (${this.id}): ${this.name}`)
    // }
    abstract describe(): void

    addEmployee(employee: string) {
        this.employees.push(employee)
    }

    printEmployeeInfo() {
        console.log(this.employees.length)
        console.log(this.employees)
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT')
    }
    describe(): void {
        console.log(`IT Department id: ${this.id}`)
    }
}

const it = new ITDepartment('d1', ['Xue heng'])
it.describe()
it.addEmployee('xiao wei')
it.printEmployeeInfo()
console.log(it)

class AccountingDepartment extends Department {
    private lastReport: string
    private static instance: AccountingDepartment

    get mostResentReport() {
        if (!this.lastReport) {
            throw new Error('lastReport is not exist!')
        }
        return this.lastReport
    }

    set mostResentReport(value: string) {
        if (!value) {
            throw new Error('Please input a valid value')
        }
        this.addReport(value)
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
        this.lastReport = reports[0]
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance
        }
        this.instance = new AccountingDepartment('d2', [])
        return this.instance
    }

    describe() {
        console.log(`Accounting Department ID : ${this.id}`)
    }

    addEmployee(employee: string): void {
        if (employee === 'Xue heng') return
        this.employees.push(employee)
    }

    addReport(report: string) {
        this.reports.push(report)
        this.lastReport = report
    }

    getReport() {
        console.log(this.reports)
    }
}

// const accounting = new AccountingDepartment('d2', [])
const accounting = AccountingDepartment.getInstance()
// const accounting1 = AccountingDepartment.getInstance()
// console.log(accounting === accounting1) // true
accounting.describe()
accounting.addEmployee('Xue heng')
accounting.addEmployee('xiao hong')
accounting.printEmployeeInfo()
accounting.addReport('something wrong')

console.log(accounting.mostResentReport)
accounting.mostResentReport = 'Year End Report'
accounting.getReport()
console.log(accounting)