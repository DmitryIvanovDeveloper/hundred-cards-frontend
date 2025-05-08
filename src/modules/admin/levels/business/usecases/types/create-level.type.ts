import Result from "@/infrastructure/helpers/result";

export type CreateLevelInput = {
    name: string;
};

export type CreateLevelOutput = Result<void>
