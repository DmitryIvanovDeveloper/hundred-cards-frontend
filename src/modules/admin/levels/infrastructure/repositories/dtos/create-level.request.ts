import { ILevelCreateDTO } from "../../../business/dtos/level.dto";

export default class CreateLevelRequest {
    readonly level: string;
    readonly lang_iso: string;
    readonly project_id: string;

    constructor(dto: ILevelCreateDTO) {
        this.level = dto.level;
        this.lang_iso = dto.lang,
        this.project_id = dto.projectId
    }
}