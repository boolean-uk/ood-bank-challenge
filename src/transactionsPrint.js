class TransactionsPrint {

  print(transactions) {
    console.log(transactions)
    console.log('date       ||  credit  ||  debit  || balance   ')
    transactions.forEach(transaction => {
      
      const date = transaction.date.padEnd(10, ' ')
      const amount = transaction.amount.padStart(7, ' ')
      const type = transaction.type
      const balance = transaction.balanceAfterTransaction.padStart(7, ' ')
      const emptySpace = ' '.padStart(8, ' ')
      if(type === 'credit'){
        console.log(`${date} || ${amount} || ${emptySpace} || ${balance} `)
      } else {
        console.log(`${date} || ${emptySpace} || ${amount} || ${balance} `)
      }
    })
  }
}


export { TransactionsPrint }