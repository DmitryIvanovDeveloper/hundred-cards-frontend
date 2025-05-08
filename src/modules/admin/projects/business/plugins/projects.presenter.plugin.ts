import Project from "../entities/project";

export default interface IProjectsPresenter {
    presentProjects(projects: Array<Project>): void;
    presentProject(project: Project): void;
    
}