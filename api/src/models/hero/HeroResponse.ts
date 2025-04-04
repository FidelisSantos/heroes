import CryptoHelper from "../../helpers/CryptHelper.js";

class HeroResponse {
    readonly id: string
    constructor(
        id: number,
        readonly name: string,
        readonly nickname: string,
        readonly date_of_birth: Date,
        readonly universe: string,
        readonly main_power: string,
        readonly avatar_url: string,
        readonly is_active: boolean,
        readonly created_at: Date,
        readonly updated_at: Date
    ) {
        this.id = CryptoHelper.encrypt(id);
    }


}

export default HeroResponse;