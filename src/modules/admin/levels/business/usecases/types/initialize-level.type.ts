import Result from "@/infrastructure/helpers/result";
import { ILevelResponseDTO } from "../../dtos/level.dto";

export type InitializeLevelInput = {
    levelResponse: Array<ILevelResponseDTO>
}

export type InitializeLevelOutput = Result<void>
