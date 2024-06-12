class TransactionsPrint {
  print(transactions) {
    console.log('date       ||  credit  ||   debit   ||   balance   ')

    transactions.forEach(transaction => {
      const date = transaction.date
      const amount = transaction.amount
      const type = transaction.type
      const balance = transaction.balance
      console.log(`${date}`)
    });
  }
}