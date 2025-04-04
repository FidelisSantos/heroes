class CreateHeroDTO {
    constructor(
        public name: string,
        public nickname: string,
        public date_of_birth: Date,
        public universe: string,
        public main_power: string,
        public avatar_url: string
    ) {}

    validate() {
        const errors: string[] = [];

        if (!this.name?.trim()) {
            errors.push("O nome é obrigatório.");
        } else if (/\d/.test(this.name)) {
            errors.push("O nome não pode conter números.");
        }

        if (!this.nickname) {
            errors.push("O apelido é obrigatório.");
        }

        if (!this.date_of_birth || isNaN(new Date(this.date_of_birth).getTime())) {
            errors.push("A data de nascimento é obrigatória.");
        }

        if (!this.universe) {
            errors.push("O universo é obrigatório.");
        }

        if (!this.main_power) {
            errors.push("O principal poder é obrigatório.");
        }

        if (this.avatar_url && !/^https?:\/\/.+\..+/.test(this.avatar_url)) {
            errors.push("A URL do avatar deve ser válida.");
        }

        return errors;
    }
}

export default CreateHeroDTO;