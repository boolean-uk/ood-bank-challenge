const User = require("../src/User");

describe("User", () => {
  let user;

  beforeEach(() => {
    user = new User(
      "patrik",
      "E",
      "W45",
      "hio@yes.it",
      "10/91",
      12345,
      "11-22-33",
      6789
    );
  });
  it("shuold return a new user", () => {
    expect(user).toBeInstanceOf(User);
    expect(user.fisrtN).toBe("patrik");
    expect(user.password).toBe(6789);
  });

  it("should be able to change password", () => {
    user.password = 1234;
    expect(user).toBeInstanceOf(User);
    expect(user.password).toBe(1234);
  });

  describe("deposit", () => {
    it("should return 'incorrect password' for a wrong password", () => {
      expect(user).toBeInstanceOf(User);
      expect(() => user.deposit(6780, 100)).toThrow(
        new Error("incorrect password")
      );
    });
    it("should return the updated account balance", () => {
      const result = user.deposit(6789, 100);
      expect(user).toBeInstanceOf(User);
      expect(result).toBe("100.00");
    });
    it("should update the depositHistory with the latest deposit", () => {
      user.deposit(6789, 100);
      expect(user).toBeInstanceOf(User);
      expect(user.depositHistory).toEqual([
        { date: "10/11/2022", ammount: 100, balance: '100.00' },
      ]);
    });
  });

  describe("withdrawal", () => {
    it("should return 'incorrect password' for a wrong password", () => {
      expect(user).toBeInstanceOf(User);
      expect(() => user.withdrawal(6780, 100)).toThrow(
        new Error("incorrect password")
      );
    });
    it("should return the updated account balance", () => {
      user.accountBalance = "100.20";
      const result = user.withdrawal(6789, 100);
      expect(user).toBeInstanceOf(User);
      expect(result).toBe("0.20");
    });
    it("should update the depositHistory with the latest deposit", () => {
      user.accountBalance = "100.20";
      user.withdrawal(6789, 100);

      expect(user).toBeInstanceOf(User);
      expect(user.withdrawlHistory).toEqual([
        { date: "10/11/2022", ammount: 100, balance: '0.20' },
      ]);
    });
    it('should prevent the user from withdrawing more money than what is on the account balance',()=>{
      user.accountBalance = "100.00";
      const result = user.withdrawal(6789, 200);

      expect(user).toBeInstanceOf(User);
      expect(result).toBe("not enough money, you pesant!");
    })
  });
});
