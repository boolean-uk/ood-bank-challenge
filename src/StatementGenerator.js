"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementGenerator = void 0;
var StatementGenerator = /** @class */ (function () {
    function StatementGenerator() {
    }
    StatementGenerator.generateStatement = function (account) {
        var maxCreditLength = 6;
        var maxDebitLength = 5;
        var maxBalanceLength = 7;
        var currentBalance = 0;
        var transactions = account.getTransactions();
        for (var i = 0; i < transactions.length; ++i) {
            var currentAmount = transactions[i].getAmount() - transactions[i].getFee();
            currentBalance += currentAmount;
            maxBalanceLength = Math.max(maxBalanceLength, String(currentBalance.toFixed(2)).length);
            if (currentAmount >= 0)
                maxCreditLength = Math.max(maxCreditLength, String(currentAmount.toFixed(2)).length);
            else
                maxDebitLength = Math.max(maxDebitLength, String(currentAmount.toFixed(2)).length);
        }
        console.log("date".concat(' '.repeat(6), " || ").concat(padToRightSpaces("credit", maxCreditLength), " || ").concat(padToRightSpaces("debit", maxDebitLength), " || balance"));
        currentBalance = 0;
        for (var i = 0; i < transactions.length; ++i) {
            var toPrint = "";
            var transaction = transactions[i];
            var currentAmount = transactions[i].getAmount() - transactions[i].getFee();
            currentBalance += currentAmount;
            toPrint += "".concat(formatDate(transaction.getDate()), " || ");
            if (currentAmount >= 0)
                toPrint += "".concat(padToLeftSpaces(String(currentAmount.toFixed(2)), maxCreditLength), " || ").concat(' '.repeat(maxDebitLength), " || ").concat(padToLeftSpaces(String(currentBalance.toFixed(2)), maxBalanceLength));
            else
                toPrint += "".concat(' '.repeat(maxCreditLength), " || ").concat(padToLeftSpaces(String(currentAmount.toFixed(2)), maxDebitLength), " || ").concat(padToLeftSpaces(String(currentBalance.toFixed(2)), maxBalanceLength));
            console.log(toPrint);
        }
        return "";
    };
    return StatementGenerator;
}());
exports.StatementGenerator = StatementGenerator;
function padToRightSpaces(input, numSpaces) {
    if (numSpaces <= input.length)
        return input;
    var spaces = ' '.repeat(numSpaces - input.length);
    return input + spaces;
}
function padToLeftSpaces(input, numSpaces) {
    if (numSpaces <= input.length)
        return input;
    var spaces = ' '.repeat(numSpaces - input.length);
    return spaces + input;
}
function formatDate(date) {
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var year = date.getFullYear();
    return "".concat(day, "/").concat(month, "/").concat(year);
}
