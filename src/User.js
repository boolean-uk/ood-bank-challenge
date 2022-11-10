class User {
  #accountNumber;
  #sortCode;
  #password;
  constructor(
    fisrtN,
    lastN,
    address,
    email,
    bDay,
    accountNumber,
    sortCode,
    password
  ) {
    this.fisrtN = fisrtN;
    this.lastN = lastN;
    this.address = address;
    this.email = email;
    this.bDay = bDay;
    this.#accountNumber = accountNumber;
    this.#sortCode = sortCode;
    this.#password = password;
    this.accountBalance = "0.00";
    this.withdrawlHistory = [];
    this.depositHistory = [];
  }
  get password() {
    return this.#password;
  }
  set password(newPassword) {
    if (
      typeof newPassword === "number" &&
      newPassword.toString().length === 4
    ) {
      return (this.#password = newPassword);
    }
  }

  getDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = dd + "/" + mm + "/" + yyyy;
    return today;
  }

  deposit(password, depositAmmount) {
    if (password !== this.#password) {
      throw new Error("incorrect password");
    }
    this.accountBalance = Number(this.accountBalance) + depositAmmount;

    this.depositHistory.push({
      date: this.getDate(),
      ammount: depositAmmount,
      balance: this.accountBalance.toFixed(2).toString(),
    });
    return this.accountBalance.toFixed(2).toString();
  }

  withdrawal(password, withdrawalAmmount) {
    if (password !== this.#password) {
      throw new Error("incorrect password");
    }

    if(Number(this.accountBalance) - withdrawalAmmount < 0){
        return "not enough money, you pesant!"
    }

    this.accountBalance = Number(this.accountBalance) - withdrawalAmmount;
    this.withdrawlHistory.push({
      date: this.getDate(),
      ammount: withdrawalAmmount,
      balance: this.accountBalance.toFixed(2).toString(),
    });
    return this.accountBalance.toFixed(2).toString();
  }
}

module.exports = User;
