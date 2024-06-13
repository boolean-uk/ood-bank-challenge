import { Bank, User } from "../index.js/";

describe("User", () => {
  let user;

  beforeEach(() => {
    user = new User("john", "sam", 1981);
  });

  it("should exist", () => {
    expect(user).toBeInstanceOf(User);
  });

  it("should check if user data is valid", () => {
    expect(() => (user = new User())).toThrow(
      new Error("First name, last name and birth year are required")
    );
  });

  it("should check if user is 18 years or older", () => {
    expect(() => (user = new User("john", "sam", 2010))).toThrow(
      new Error("You should be at least 18 years old")
    );
  });

  it("user can add money and his balance gets updated ", () => {
    user.deposit(100);
    user.deposit(150);

    console.log = jasmine.createSpy("log");
    const messsage = user.getBalance();

    expect(console.log).toHaveBeenCalledWith(
      `Your available balance now is €250`
    );
  });

  it("user can withdraw money and his balance gets updated ", () => {
    user.deposit(100);
    user.deposit(150);

    user.withdraw(150);

    console.log = jasmine.createSpy("log");
    const messsage = user.getBalance();

    expect(console.log).toHaveBeenCalledWith(
      `Your available balance now is €100`
    );
  });

  it("user cannot withdraw money more than his balance", () => {
    user.deposit(100);
    user.deposit(150);

    expect(() => user.withdraw(300)).toThrow(
      new Error("Your balance is not enough")
    );
  });
});
