import { ref } from "vue";
import Project from "../../business/entities/project";
import IProjectsPresenter from "../../business/plugins/projects.presenter.plugin";
import ProjectViewModel from "../view-models/project.view-model";

export default class ProjectsPresenter implements IProjectsPresenter {
    readonly projectViewModel = ref<ProjectViewModel>();
    readonly projectsViewModel = ref<Array<ProjectViewModel>>([]);

    public presentProject(project: Project): void {
        const viewModel = new ProjectViewModel(project);

        this.projectViewModel.value = viewModel;
    }

    public presentProjects(project: Array<Project>): void {
        const viewModels = project.map(project => new ProjectViewModel(project));

        this.projectsViewModel.value = viewModels;
    }
}