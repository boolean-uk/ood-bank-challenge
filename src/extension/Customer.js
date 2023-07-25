"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
var Customer = /** @class */ (function () {
    function Customer(firstName, lastName, birthDate) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate;
    }
    Customer.prototype.getFirstName = function () {
        return this.firstName;
    };
    Customer.prototype.getLastName = function () {
        return this.lastName;
    };
    return Customer;
}());
exports.Customer = Customer;
