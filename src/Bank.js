// Dependencies

const Card = require("./Card.js");
const PrintStatement = require("./printStatement.js");
const Transactions = require("./Transactions.js");

class Bank {
  cards = [];
  balance;
  constructor() {
    this._updateBalance();
  }

  printStatement(cardName) {
    const currCard = this.searchCard(cardName);
    const printStatement = new PrintStatement(currCard);
    return printStatement._print();
  }

  createCard(ownerName) {
    const card = new Card(ownerName);
    this.cards.push(card);
  }

  searchCard(cardName) {
    return this.cards.filter((card) => card.name === cardName)[0];
  }

  deposit(cardName, amount) {
    const currCard = this.searchCard(cardName);
    currCard._deposit(amount);
    this._updateBalance();
  }
  withdraw(cardName, amount, category) {
    const currCard = this.searchCard(cardName);
    currCard._withdraw(amount, category);
    this._updateBalance();
  }

  _updateBalance() {
    this.balance = this.cards.reduce((total, card) => total + card.balance, 0);
  }
}

module.exports = Bank;
