import { ILevelCreateDTO, ILevelResponseDTO } from "../dtos/level.dto";


export default class Level {
    readonly id: string;
    readonly name: string;
    readonly lang: string;
    readonly projectId: string;
  
    constructor(id: string, name: string, lang: string, projectId: string) {
      this.id = id;
      this.name = name;
      this.lang = lang;
      this.projectId = projectId;
    }
  
    static fromResponseDto(dto: ILevelResponseDTO): Level {
      return new Level(dto.id, dto.level, dto.lang, dto.projectId);
    }
  
    static create(name: string, lang: string, projectId: string): Level {
      return new Level('', name, lang, projectId);
    }
      
    toCreateDto(): ILevelCreateDTO {
      return {
        level: this.name,
        lang: 'this.lang',
        projectId: this.projectId
      };
    }
  
  
    toResponseDto(): ILevelResponseDTO {
      return {
        id: this.id,
        level: this.name,
        lang: this.lang,
        projectId: this.projectId
      };
    }
  }
  