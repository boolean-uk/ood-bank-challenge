class TransactionsPrint {

  print(transactions) {
    const result = []
    result.push('date       ||  credit ||  debit   || balance  ')
    
    transactions.forEach(transaction => {
      const date = transaction.date.padEnd(10, ' ')
      const amount = transaction.amount.padStart(7, ' ')
      const type = transaction.type
      const balance = transaction.balanceAfterTransaction.toString().padStart(7, ' ')
      const emptySpace = ' '.padStart(8, ' ')
      if(type === 'credit'){
        result.push(`${date} || ${amount} || ${emptySpace} || ${balance} `)
      } else {
        result.push(`${date} || ${emptySpace}|| ${amount}  || ${balance} `)
      }
    })
    return result
  }
}


export { TransactionsPrint }