import IAccount from "./Account.model";

export default class Account implements IAccount {
    id: string;
    name: string;
    transactions: string[];
    owner: string;

    constructor(id: string, name: string, owner: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.transactions = [];
    }

    get ownerId(): string {
        return this.owner;
     }




}