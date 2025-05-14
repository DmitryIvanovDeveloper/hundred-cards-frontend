import ProjectViewModel from "../view/view-models/project.view-model";
import { inject } from "inversify";
import { TYPES } from "../../types";
import IProjectsLocalRepository from "../../business/plugins/projects.local.repository.plugin";
import { computed } from "@vue/reactivity";

export default class ProjectsPresenter {

    constructor(
        @inject(TYPES.ProjectsLocalRepository)
        private readonly _repository: IProjectsLocalRepository
    ) {}


    public readonly label = {
        title: 'Проекты'
    }
    readonly projectViewModel =  computed(() => this.presentProject());
    readonly projectsViewModel = computed(() =>this.presentProjects());

    private presentProject(): ProjectViewModel | null {
        const project = this._repository.getProject().value;
        if (!project) {
            return null;
        }

        return new ProjectViewModel(project);
    }

    private presentProjects(): Array<ProjectViewModel> {
        return this._repository
            .getProjects().value
            .map(project => new ProjectViewModel(project))
        ;
    }
}