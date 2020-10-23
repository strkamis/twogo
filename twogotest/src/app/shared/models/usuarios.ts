export class User {
    name: string;
    email: string;
    cpf: string;
    cnpj: string;
    phone: string;
    id;
    namecomercial: string;

    constructor(name: string, email: string, cpf: string, cnpj: string, phone: string, namecomercial: string) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.cnpj = cnpj;
        this.phone = phone;
        namecomercial = namecomercial;
    }
}

export class UserLogin {
    email: string;
    password: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}
