import Bank from "../src/Bank";

describe('Bank', () => {
    it('should create an instance of Bank', () => {
        expect(() => Bank.getInstance()).toBeDefined();
    });
})