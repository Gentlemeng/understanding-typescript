function Autobind(
    target: any,
    name: string,
    descriptor: PropertyDescriptor
): PropertyDescriptor {
    const originalMethod = descriptor.value;
    return {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        },
    };
}

enum ProjectStatus {
    Active = "active",
    Finished = "finished",
}
class Project {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) { }
}
type listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: listener<T>[] = [];
    addListener(listenerFn: listener<T>) {
        this.listeners.push(listenerFn);
    }
}
// 全局状态管理对象
class ProjectState extends State<Project> {

    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super()
    }

    addProjects(
        id: string,
        title: string,
        description: string,
        numOfPeople: number,
        status: ProjectStatus
    ) {
        this.projects.push({
            id,
            title,
            description,
            people: +numOfPeople,
            status,
        });
        this.trigger();
    }
    private trigger() {
        this.listeners.forEach((listener) => {
            listener(this.projects.slice());
        });
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(templateId: string, hostElementId: string, newElementId?: string) {
        this.templateElement = document.getElementById(
            templateId
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;
        const importedNode = document.importNode(
            this.templateElement.content,
            true
        );
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
            this.element.id = newElementId
        }
    }

    abstract configure(): void
    abstract renderContent(): void
    abstract attach(): void
    // () {
    //     this.hostElement.insertAdjacentElement("afterbegin", this.element);
    // }
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
    get persons() {
        return this.project.people === 1 ? '1 person' : `${this.project.people} psersons`
    }
    constructor(
        hostId: string,
        private project: Project
    ) {
        super('single-project', hostId, project.id)
        this.project = project
        this.renderContent()
        this.attach()
    }
    attach(): void {
        this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
    configure(): void {

    }
    renderContent(): void {
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = this.persons.toString() + ' assigned'
        this.element.querySelector('p')!.textContent = this.project.description
    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[] = [];

    constructor(private type: ProjectStatus) {
        super('project-list', 'app', `${type}-projects`)
        this.attach();
        this.configure();
        this.renderContent();
    }

    private renderProjects() {
        const listEl = document.querySelector(
            `#${this.type}-projects-list`
        )! as HTMLUListElement;
        listEl.innerHTML = "";
        this.assignedProjects.forEach(item => {
            // const li = document.createElement("li");
            // li.textContent = item.title;
            // listEl.appendChild(li);
            new ProjectItem(listEl.id, item)
        });
    }

    configure(): void {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(prj => prj.status === this.type);
            this.renderProjects();
        });
    }

    renderContent() {
        const ulId = `${this.type}-projects-list`;
        this.element.querySelector("ul")!.id = ulId;
        this.element.querySelector("h2")!.textContent =
            //   this.type.toUpperCase() + "PROJECT";
            this.type + "PROJECT";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}

class ProjectInput extends Component<HTMLDivElement, HTMLElement> {


    titleEl: HTMLInputElement;
    descriptEl: HTMLInputElement;
    peopleEl: HTMLInputElement;

    enteredTitle: string = "";
    enteredDescription: string = "";
    enteredPeople: string = "";

    constructor() {
        super("project-input", 'app', 'user-input')
        this.attach();

        this.titleEl = document.getElementById("title") as HTMLInputElement;
        this.descriptEl = document.getElementById(
            "description"
        ) as HTMLInputElement;
        this.peopleEl = document.getElementById("people") as HTMLInputElement;

        this.configure();
        this.renderContent()
    }

    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent(): void { }

    private gatherUserInput(): [string, string, number] | undefined {
        this.enteredTitle = this.titleEl.value;
        this.enteredDescription = this.descriptEl.value;
        this.enteredPeople = this.peopleEl.value;

        if (
            this.enteredTitle.length === 0 ||
            this.enteredDescription.length === 0 ||
            this.enteredPeople.length === 0
        ) {
            alert("Invalid input, Please try again");
            return;
        } else {
            return [this.enteredTitle, this.enteredDescription, +this.enteredPeople];
        }
    }

    private clearInputs() {
        this.titleEl.value = "";
        this.descriptEl.value = "";
        this.peopleEl.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInputContent = this.gatherUserInput();
        if (Array.isArray(userInputContent)) {
            const [title, description, people] = userInputContent;
            // 往全局状态管理对象.projects push item
            projectState.addProjects(
                Math.random().toString(),
                title,
                description,
                people,
                ProjectStatus.Active
            );
            this.clearInputs();
        }
    }

    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}

const projectState = ProjectState.getInstance();
const project = new ProjectInput();
const activeList = new ProjectList(ProjectStatus.Active);
const finishedList = new ProjectList(ProjectStatus.Finished);
