import Account from "./accounts/Account";
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

  getUser(id: string): User | undefined{
    return this.users.find(user => user.id === id);
   }
  
  unregisterUser(id: string): void {
    const user = this.getUser(id);
    if (user) this.users = this.users.filter(user => user.id !== id);
   }

   getAccount(id: string) : Account | undefined{
    return this.users.find(user => user.accounts.find(account => account.id === id) !== undefined)?.accounts.find(account => account.id === id);
}
}
