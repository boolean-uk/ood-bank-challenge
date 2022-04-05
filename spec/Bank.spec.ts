import Bank from "../src/Bank";

describe('Bank', () => {
    const bank = Bank.getInstance();
    beforeEach(() => { 
        bank.users = [];
    })

    it('should create an instance of Bank', () => {
        expect(() => Bank.getInstance()).toBeDefined();
    });

    describe('User management', () => { 
        it('should register a user', () => {
            const bank = Bank.getInstance();
            bank.registerUser('John', 'Doe');
            expect(bank.users.length).toBe(1);
        });

        it('should not register a user with the same id', () => {
            const bank = Bank.getInstance();
            const user1 = bank.registerUser('John', 'Doe');
            const user2 = bank.registerUser('John', 'Dove');
            expect(user1.id).not.toBe(user2.id);
        });

        it('should remove the user from the list after unregistering', () => {
            const bank = Bank.getInstance();
            const user = bank.registerUser('John', 'Doe');
            bank.unregisterUser(user.id);
            expect(bank.users.length).toBe(0);
        })
    })


})