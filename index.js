export class Bank {
  #date;
  #balance;
  #credit;
  #debit;
  #statement;
  constructor() {
    this.#date = "";
    this.#balance = 0;
    this.#credit = 0;
    this.#debit = 0;
    this.#statement = [];
  }

  deposit(num) {
    this.#date = this.getDate();
    this.#credit = num;
    this.#balance += num;

    this.#statement.push({
      date: this.#date,
      credit: this.#credit,
      debit: "",
      balance: +this.#balance.toFixed(2),
    });
  }

  withdraw(num) {
    if (this.#balance === 0 || num > this.#balance)
      throw new Error("Your balance is not enough");

    this.#date = this.getDate();
    this.#debit = num;
    this.#balance -= num;

    this.#statement.push({
      date: this.#date,
      credit: "",
      debit: this.#debit,
      balance: +this.#balance.toFixed(2),
    });
  }

  getDate() {
    const today = new Date();
    return `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
  }

  getStatement() {
    console.table(this.#statement.slice().reverse());
    this.getBalance();
  }

  getBalance() {
    console.log(`Your available balance now is €${+this.#balance.toFixed(2)}`);
  }
}

export class User extends Bank {
  #accountNo;
  #dateCreated;
  #firstName;
  #lastName;

  constructor(firstName, lastName, birthYear) {
    const age = new Date().getFullYear() - birthYear;

    if (age < 18) throw new Error("You should be at least 18 years old");

    if (!firstName || !lastName || !birthYear)
      throw new Error("First name, last name and birth year are required");

    super();
    this.#accountNo = this.#createAccountNo(firstName, lastName, birthYear);
    this.#dateCreated = this.getDate();
    this.#firstName = firstName.toUpperCase();
    this.#lastName = lastName.toUpperCase();
  }

  getAccountInfo() {
    console.log(`
      Name: ${this.#firstName} ${this.#lastName}
      Account No: ${this.#accountNo}
      Date Created: ${this.#dateCreated}
          `);
  }

  getStatement() {
    this.getAccountInfo();
    super.getStatement();
  }

  #createAccountNo(firstName, lastName, birthYear) {
    const accountNo = `${this.getDate().replaceAll(
      "-",
      ""
    )}${firstName[0].toUpperCase()}${lastName[0].toUpperCase()}${birthYear}`;

    return accountNo;
  }
}
