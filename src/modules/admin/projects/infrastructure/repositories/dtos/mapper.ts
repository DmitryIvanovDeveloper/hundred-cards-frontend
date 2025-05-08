import ProjectDTO from "../../../business/dtos/project.dto";
import GetProjectResponse from "./get-project.response";

export function mapProjectResponseToDto(response: GetProjectResponse): ProjectDTO {
    const dto: ProjectDTO = {
        id: response.id,
        name:  response.name,
        created: response.created,
        userId:  response.user_id,
    }

    return dto;
}