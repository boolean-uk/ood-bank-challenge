"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bank = void 0;
var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["WITHDRAWAL"] = "WITHDRAWAL";
})(TransactionType || (TransactionType = {}));
var Bank = /** @class */ (function () {
    function Bank() {
    }
    return Bank;
}());
exports.Bank = Bank;
module.exports = Bank;
