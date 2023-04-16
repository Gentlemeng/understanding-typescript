/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
    export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[] = [];

        constructor(private type: ProjectStatus) {
            super('project-list', 'app', `${type}-projects`)
            this.attach();
            this.configure();
            this.renderContent();
        }
        @autobind
        dragOverHandler(event: DragEvent): void {
            // console.log(event.dataTransfer!.getData('text/plain'))
            // 只响应 project 拖拽
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault()
                this.element.querySelector('ul')?.classList.add('droppable')
            }
        }

        @autobind
        dropHandler(event: DragEvent): void {
            // console.log(event.dataTransfer!.getData('text/plain'))
            const pjtId = event.dataTransfer!.getData('text/plain')
            projectState.moveProject(pjtId, this.type)
        }

        @autobind
        dragLeaveHandler(event: DragEvent): void {
            this.element.querySelector('ul')?.classList.remove('droppable')
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
            this.element.addEventListener('dragover', this.dragOverHandler)
            this.element.addEventListener('drop', this.dropHandler)
            this.element.addEventListener('dragleave', this.dragLeaveHandler)
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
}
