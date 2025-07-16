import { LoadAchievementInput } from "@/modules/admin/achievements/business/usecases/types/load-achievements";
import { BaseUseCase } from "@/modules/shared/usecase/bases-usecase";
import { LoadMembersInput, LoadMembersOutput } from "./types/load-members.type";
import { inject } from "inversify";
import { TYPES } from "../../types";
import { TYPES as ProjectsTYPES } from "@/modules/admin/projects/types";
import IMembersHttpRepository from "../plugins/members.http-repository.plugin";
import Result from "@/infrastructure/helpers/result";
import MemberNotLoadedError from "../errors/member-not-loaded.error";
import { Member } from "../entities/member";
import IMembersLocalRepository from "../plugins/members.local-repository.plugin";

export default class LoadMembersUseCase implements BaseUseCase<LoadMembersInput, LoadMembersOutput> {

    constructor(
        @inject(TYPES.MembersHttpRepository)
        private readonly _httpRepository: IMembersHttpRepository,

        @inject(TYPES.MembersLocalRepository)
        private readonly _localRepository: IMembersLocalRepository,
    ) {}

    public async execute(input: LoadMembersInput): Promise<LoadMembersOutput> {
        const result = await this._httpRepository.loadMembers();
        if (!result.hasData()) {
            return Result.failure(new MemberNotLoadedError());
        }

       
        const entities = result.data.map(Member.toEntity);
        this._localRepository.storeMembers(entities);

        return Result.success();
    }
}