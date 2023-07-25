import { Account } from "./account";
import { PersonalAccount } from "./personalaccunt";

export class InvestmentAccount extends Account implements PersonalAccount{
    accountType(): string {
        return "Invetment Account"
    }
    
}