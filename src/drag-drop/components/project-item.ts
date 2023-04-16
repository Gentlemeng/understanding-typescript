/// <reference path="base-component.ts" />
/// <reference path="../models/drag-drop.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project-state.ts" />

namespace App {
    export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Dragable {
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
            this.configure()
            this.attach()
        }
        attach(): void {
            this.hostElement.insertAdjacentElement('beforeend', this.element)
        }
        configure(): void {
            this.element.addEventListener('dragstart', this.dragStartHandler)
            this.element.addEventListener('dragend', this.dragEndHandler)
        }
        renderContent(): void {
            this.element.querySelector('h2')!.textContent = this.project.title
            this.element.querySelector('h3')!.textContent = this.persons.toString() + ' assigned'
            this.element.querySelector('p')!.textContent = this.project.description
        }

        @autobind
        dragStartHandler(event: DragEvent): void {
            console.log('this.project.id', this.project.id)
            event.dataTransfer!.setData('text/plain', this.project.id)
            event.dataTransfer!.effectAllowed = 'move'
        }

        @autobind
        dragEndHandler(event: DragEvent): void {
            console.log('END');
        }
    }
}
