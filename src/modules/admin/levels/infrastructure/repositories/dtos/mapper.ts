import ILevelDTO from "../../../business/dtos/level.dto";
import GetLevelResponse from "./get-levels.response";
import GetProjectResponse from "./get-levels.response";

export function mapLevelResponseToDto(response: GetLevelResponse): ILevelDTO {
    const dto: ILevelDTO = {
        id: response.id,
        level: response.level,
        lang: response.lang_iso,
        projectId: response.project_id,
    }

    return dto;
}