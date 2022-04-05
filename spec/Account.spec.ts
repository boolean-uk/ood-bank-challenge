import Account from "../src/accounts/Account";
import Bank from "../src/Bank";

describe('Account', () => { 
    const bank = Bank.getInstance();

    beforeEach(() => {
        bank.users = [];
    })

    it('should register an account upon user registration', () => { 
        const user = bank.registerUser('John', 'Doe');
        expect(user.accounts.length).toBe(1);
    })
})