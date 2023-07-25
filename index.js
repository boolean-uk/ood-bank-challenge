"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Customer_1 = require("./src/core/Customer");
var CurrentAccount_1 = require("./src/core/CurrentAccount");
var TRANSACTION_TYPE_1 = require("./src/core/enums/TRANSACTION_TYPE");
// printing bank statement
var customer = new Customer_1.Customer("John", "Doe", new Date("1990-01-01"));
var current = new CurrentAccount_1.CurrentAccount(customer);
current.createTransaction(1000, TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT, new Date("2020-01-10"));
current.createTransaction(2000, TRANSACTION_TYPE_1.TRANSACTION_TYPE.CREDIT, new Date("2020-01-13"));
current.createTransaction(500, TRANSACTION_TYPE_1.TRANSACTION_TYPE.DEBIT, new Date("2020-01-14"));
current.printBankStatement();
