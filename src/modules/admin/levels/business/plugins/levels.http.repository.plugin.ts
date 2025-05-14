import Result from "@/infrastructure/helpers/result";
import { ILevelCreateRequestDTO, ILevelCreateResponseDTO } from "../dtos/level.create.dto";
import { ILevelLoadResponseDTO } from "../dtos/level.load.dto";
import { ILevelUpdateRequestDTO, ILevelUpdateResponseDTO } from "../dtos/level.update.dto";

export default interface ILevelsHttpRepository {
    updateLevel(updateRequest: ILevelUpdateRequestDTO): Promise<Result<ILevelUpdateResponseDTO>>;
    createLevel(dto: ILevelCreateRequestDTO): Promise<Result<ILevelCreateResponseDTO>>;
    loadLevels(projectId: string): Promise<Result<Array<ILevelLoadResponseDTO>>>;
}