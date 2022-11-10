class Transaction {
    constructor(valueOfTransaction) {
        this.value = valueOfTransaction
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
        return value
    }

    withdraw(value) {
        return value
    }
}

module.exports = Transaction