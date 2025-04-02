import { IsString, IsNotEmpty, IsOptional, IsDate, IsUrl } from "class-validator";
import { Type } from "class-transformer";

export class CreateHeroDTO {
    @IsString()
    @IsNotEmpty({ message: "O nome é obrigatório" })
    name: string;

    @IsString()
    @IsNotEmpty({ message: "O apelido é obrigatório" })
    nickname: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty({ message: "A data de nascimento é obrigatória" })
    date_of_birth: Date;

    @IsString()
    @IsNotEmpty({ message: "O universo é obrigatório" })
    universe: string;

    @IsString()
    @IsNotEmpty({ message: "O principal poder é obrigatório" })
    main_power: string;

    @IsOptional()
    @IsUrl({}, { message: "A URL do avatar deve ser válida" })
    avatar_url?: string;
}

export default CreateHeroDTO;