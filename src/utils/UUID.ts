import crypto from 'crypto'
export default class UUID{
    USER_SEED = "KEYSFORUSERS123123123";
    ACCOUNT_SEED = "KEYSFORACCOUNTS123123123";

    //TODO: GENERATE UUIDS based on seed

    static forUser() {
        return crypto .randomUUID();
     }

     static forAccount() {
        return crypto .randomUUID();
     }

}


 

