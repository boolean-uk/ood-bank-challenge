export default class Bank {

    //singleton
    private static instance: Bank;

    static getInstance(): Bank {
        if (!Bank.instance) 
            Bank.instance = new Bank();
        return Bank.instance;
    }

    private constructor() {
        //singleton
        if(Bank.instance) throw new Error("Error: Instantiation failed: Use Bank.getInstance() instead of new.");
    }

}