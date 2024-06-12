export class Account{
    private balanceHistory: [string, boolean, number][] = []
    
    getBalanceHistory(): [string, boolean, number][]{
        return this.balanceHistory
    }


    balanceAfterEachTransaction(toIndex: number): number {
        let total = 0;
        for (let i = 0; i <= toIndex; i++) {
          if (this.balanceHistory[i][1] === true) {
            total += this.balanceHistory[i][2];
          } else if (this.balanceHistory[i][1] === false) {
            total -= this.balanceHistory[i][2];
          }
        }
        return total;
      }
    
    totalBalance(): number {
        return this.balanceAfterEachTransaction(this.balanceHistory.length)
    }

    transaction (money : number, ifDeposit : boolean) {
        let date = new Date()
        let today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()

        this.balanceHistory.push([today,ifDeposit,money])
        return this.balanceHistory
    }
}