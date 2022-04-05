import User from "./users/User";
import UUID from "./utils/UUID";

export default class Bank {
  //singleton
  private static instance: Bank;
  users: Array<User> = [];

  static getInstance(): Bank {
    if (!Bank.instance) Bank.instance = new Bank();
    return Bank.instance;
  }

  private constructor() {
    //singleton
    if (Bank.instance)
      throw new Error(
        "Error: Instantiation failed: Use Bank.getInstance() instead of new."
      );
  }

  registerUser(firstName: string, lastName: string): User {
    const user = new User(UUID.forUser(), firstName, lastName);
    this.users.push(user);
    return user;
  }
}
