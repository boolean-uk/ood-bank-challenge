class Bank {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    this.balanace += amount;
    const transaction = {};
  }

  date() {
    const date = new Date();
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    const yyyy = date.getFullYear();

    if (dd < 10) dd = `0${dd}`;
    if (mm < 10) mm = `0${mm}`;

    return `${dd}/${mm}/${yyyy}`;
  }
}

module.exports = Bank;
