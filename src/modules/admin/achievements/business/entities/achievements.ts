import { CreateAchievementRequestDTO, CreateAchievementResponseDTO } from "../dtos/create-achievements.dto";
import { LoadAchievementsResponseDTO } from "../dtos/load-achievements.dto";
import { v4 as uuidv4 } from 'uuid';

export interface AchievementProps {
    id: string;
    name: string;
    correctAnswersInRow: number;
    timeCompleted: number;
    stars: number;
    earnedMoney: number;
    lang: string;
    projectId: string;
    description: string;
    published: boolean;
    levelsId: Array<string>;
    edited?: boolean;
}

export default class Achievement {
    constructor(
        public readonly id: string = uuidv4(),
        public readonly name: string,
        public readonly correctAnswersInRow: number,
        public readonly timeCompleted: number,
        public readonly stars: number,
        public readonly earnedMoney: number,
        public readonly lang: string,
        public readonly projectId: string,
        public readonly description: string,
        public readonly published: boolean,
        public readonly levelsId: Array<string>,
        public readonly edited?: boolean,
    ) {}

    public updatedWithName(name: string): this {
        return this.cloneWith({ name });
    }

    public updatedWithCorrectAnswersInRow(correctAnswersInRow: number): this {
        return this.cloneWith({ correctAnswersInRow });
    }

    public updatedWithStars(stars: number): this {
        return this.cloneWith({ stars });
    }

    public updatedWithEarnedMoney(earnedMoney: number): this {
        return this.cloneWith({ earnedMoney });
    }

    public updatedWithDescription(description: string): this {
        return this.cloneWith({ description });
    }

    public updatedWithPublished(published: boolean): this {
        return this.cloneWith({ published });
    }

    public updatedWithAddedLevelId(levelId: string): this {
        const updatedLevelsId = [...this.levelsId, levelId];
        return this.cloneWith({ levelsId: updatedLevelsId });
    }

    public cloneWith(params: Partial<AchievementProps>): this {
        return new Achievement(
            this.id,
            params.name ?? this.name,
            params.correctAnswersInRow ?? this.correctAnswersInRow,
            params.timeCompleted ?? this.timeCompleted,
            params.stars ?? this.stars,
            params.earnedMoney ?? this.earnedMoney,
            params.lang ?? this.lang,
            params.projectId ?? this.projectId,
            params.description ?? this.description,
            params.published ?? this.published,
            params.levelsId ?? this.levelsId,
        ) as this;
    }

    static toEntity(dto: LoadAchievementsResponseDTO | CreateAchievementResponseDTO): Achievement {
        return new Achievement(
            dto.id,
            dto.text,
            dto.correctAnswersInRow,
            dto.timeCompleted,
            dto.stars,
            dto.earnedMoney,
            dto.lang,
            dto.projectId,
            dto.description,
            dto.published,
            dto.levelsId,
        );
    }

    static toCreateRequest(projectId: string): CreateAchievementRequestDTO {
        return {
            text: 'Новое достижение',
            lang: "RU",
            projectId,
            correctAnswersInRaw: 0,
            timeCompleted: 0,
            stars: 0,
            earnedMoney: 0,
            description: '',
            published: false,
            levelsId: []
        };
    }
}
