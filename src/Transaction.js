class Transaction {
    constructor(valueOfTransaction, currentBalance) {
        this.value = valueOfTransaction
        this.currentBalance = currentBalance
    }

    handleTransaction(){
    const transactionType = Math.sign(this.value)    
        switch(transactionType) {
            case 0:
                console.log('case 0')
                throw new Error('transaction must be non-zero')
            case -0:
                console.log('case -0')
                throw new Error('transaction must be non-zero')
            case 1:
                console.log('case 1')
                return this.deposit(this.value)
            case -1:
                console.log('case -1')
                return this.withdraw(this.value)
            default:
                console.log('default')
                throw new Error('must be a number')
        }
    }

    deposit(value) {
        const newBalance = this.currentBalance + value
        return {
            date: this.#getCurrentDate(),
            oldBalance: this.currentBalance,
            debit: '',
            credit: value,
            newBalance: newBalance
        }
    }

    withdraw(value) {
        const newBalance = this.currentBalance + value
        return {
            date: this.#getCurrentDate(),
            oldBalance: this.currentBalance,
            debit: value,
            credit: '',
            newBalance: newBalance
        }
    }

    #getCurrentDate() {
        const currentDate = new Date()
        let date, month, year;

        date = currentDate.getDate();
        month = currentDate.getMonth() + 1;
        year = currentDate.getFullYear();
      
          date = date
              .toString()
              .padStart(2, '0');
      
          month = month
              .toString()
              .padStart(2, '0');
      
        return `${date}-${month}-${year}`;
      }
}

const testTransaction = new Transaction(1000, 2000)
console.log(testTransaction.handleTransaction())

module.exports = Transaction