import Result from "@/infrastructure/helpers/result";
import Level from "../entities/level";
import { ILevelCreateDTO, ILevelResponseDTO } from "../dtos/level.dto";

export default interface ILevelsRepository {
    createLevel(dto: ILevelCreateDTO): Promise<Result<ILevelResponseDTO>>;
    storeLevel(level: Level): void;
    storeLevels(levels: Array<Level>): void;
    findLevelById(id: string): Result<Level>;
    getLevel(): Result<Level>;
    loadLevels(projectId: string): Promise<Result<Array<ILevelResponseDTO>>>;
}