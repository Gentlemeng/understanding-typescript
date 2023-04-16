/// <reference path="base-component.ts" />

namespace App {
    export class ProjectInput extends Component<HTMLDivElement, HTMLElement> {
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

        @autobind
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
}
