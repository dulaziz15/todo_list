import { IsOptional, IsString, MinLength } from "class-validator";

export class TodoSearchDto {
    @IsOptional()
    @IsString()
    @MinLength(2)
    public tag: string;

    @IsOptional()
    @IsString()
    public completed: boolean;
}