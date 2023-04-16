
/// <reference path="models/project.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
namespace App {
    const project = new ProjectInput();
    const activeList = new ProjectList(ProjectStatus.Active);
    const finishedList = new ProjectList(ProjectStatus.Finished);
}
