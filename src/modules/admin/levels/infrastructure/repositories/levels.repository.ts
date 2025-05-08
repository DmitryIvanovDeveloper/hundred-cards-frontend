import IHttpClient from "@/infrastructure/api/http/http.interface";
import { TYPES } from "@/infrastructure/bootstrap/types";
import { inject } from "inversify";
import Result from "@/infrastructure/helpers/result";
import { NetworkError } from "@/infrastructure/errors/network.error";
import GetProjectResponse from "./dtos/get-levels.response";
import { mapLevelResponseToDto } from "./dtos/mapper";
import ILevelsRepository from "../../business/plugins/levels.repository.plugin";
import Level from "../../business/entities/level";
import { ILevelCreateDTO, ILevelResponseDTO } from "../../business/dtos/level.dto";
import CreateLevelRequest from "./dtos/create-level.request";
import CreateLevelResponse from "./dtos/post-level.response";
import LevelNotFoundError from "../../business/errors/level-not-found.error";
import LevelNotSelectedError from "../../business/errors/level-not-selected.error";

export default class LevelsRepository implements ILevelsRepository  {

    constructor(
        @inject(TYPES.HttpClient)
        private readonly _httpClient: IHttpClient 
    ){}
  
    private _levels: Array<Level> | null = null;
    private _level: Level | null = null;

    public storeLevels(levels: Array<Level>): void {
        this._levels = levels;
    }

    public storeLevel(level: Level): void {
        this._level = level;
    }

    public getLevel(): Result<Level> {
        if (!this._level) {
            return Result.failure(new LevelNotSelectedError())
        }

        return Result.success(this._level);
    }

    public findLevelById(id: string): Result<Level> {
        const expetedLevel = this._levels?.find(level => level.id === level.id);
        if (!expetedLevel) {
            return Result.failure()
        }

        return Result.success(expetedLevel);
    }

    public loadLevels = async (projectId: string): Promise<Result<Array<ILevelResponseDTO>>> => {
        const endpoint = `cards/admin/levels/?project_id=${projectId}/`;

        const response = await this._httpClient.get<Array<GetProjectResponse>>(endpoint);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = response.data.map(mapLevelResponseToDto);

        return Result.success(dto);
    }

    public createLevel = async (createLevelDto: ILevelCreateDTO): Promise<Result<ILevelResponseDTO>> => {
        const endpoint = `cards/admin/levels/`;

        const request = new CreateLevelRequest(createLevelDto);

        const response = await this._httpClient.post<CreateLevelResponse, CreateLevelRequest>(endpoint, request);
        if (!response.isSuccess || !response.data) {
            return this.handleNetworkError(response.errors as NetworkError)
        }

        const dto = mapLevelResponseToDto(response.data);

        return Result.success(dto);
    }

    private handleNetworkError<T>(networkError: NetworkError): Result<T> {
        return Result.failure();
    }
}