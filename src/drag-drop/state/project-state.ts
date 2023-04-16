namespace App {
    export class Project {
        constructor(
            public id: string,
            public title: string,
            public description: string,
            public people: number,
            public status: ProjectStatus
        ) { }
    }
    class State<T> {
        protected listeners: listener<T>[] = [];
        addListener(listenerFn: listener<T>) {
            this.listeners.push(listenerFn);
        }
    }
    // 全局状态管理对象
    export class ProjectState extends State<Project> {

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
        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId)
            if (project && project.status !== newStatus) {
                project.status = newStatus
                this.trigger();
            }
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
    export const projectState = ProjectState.getInstance();
}
