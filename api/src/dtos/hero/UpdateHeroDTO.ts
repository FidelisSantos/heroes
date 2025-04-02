import { IsString, IsNotEmpty, IsOptional, IsDate, IsUrl } from "class-validator";
import { Transform, Type } from "class-transformer";
import CryptoHelper from "../../helpers/CryptHelper";

export class UpdateHeroDto {
    @IsNotEmpty({ message: "O ID é obrigatório" })
    @IsString()
    @Transform(({ value }) => {
        const decryptedValue = CryptoHelper.decrypt(value);
        const parsedNumber = Number(decryptedValue);

        if (isNaN(parsedNumber)) {
            throw new Error("ID inválido");
        }

        return parsedNumber;
    })
    id: number;
    
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


export default UpdateHeroDto;