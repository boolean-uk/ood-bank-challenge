const statement = `
        date     ||   credit ||   debit ||   balance
        ${transactions[0].date} || ${this.checkTransaction(transactions[0].credit)}   || ${this.checkTransaction(transactions[0].debit)}
        ${transactions[1].date} || ${this.checkTransaction(transactions[1].credit)}   || ${this.checkTransaction(transactions[1].debit)}
        ${transactions[2].date} || ${this.checkTransaction(transactions[2].credit)}   || ${this.checkTransaction(transactions[2].debit)}
        ${transactions[3].date} || ${this.checkTransaction(transactions[3].credit)}   || ${this.checkTransaction(transactions[3].debit)}`