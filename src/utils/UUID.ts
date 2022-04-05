import crypto from 'crypto'
export default class UUID{
    USER_SEED = "KEYSFORUSERS123123123";

    static forUser() {
        return crypto .randomUUID();
     }

}


 

