import Result from "@/infrastructure/helpers/result";

export default interface IProjectsService {
    getSelectedProjectId:() => Result<string>
}