import { IsOptional, IsString, MinLength } from "class-validator";

export class TodoSearchDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    public tag: number;

    @IsOptional()
    @IsString()
    public completed: boolean;
}