import {Component, ViewChild} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";
import {MatSort, Sort} from "@angular/material/sort";
import {Transaction} from "../../interfaces/transaction";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-bank', templateUrl: './bank.component.html', styleUrls: ['./bank.component.scss']
})
export class BankComponent {

  columns: string[] = ["Date", "Type", "Balance", "Balance Before", "Balance After"]
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([])
  @ViewChild(MatSort) sort: MatSort = new MatSort()

  constructor(private bankService: BankStorageService) {
    this.getBankHistory().subscribe(history => {
      this.dataSource.data = history
      this.dataSource.sort = this.sort
    })
  }

  getBankBalance() {
    return this.bankService.balance
  }

  getBankHistory() {
    return this.bankService.history
  }

  sortData(sort: Sort) {
    const data: Transaction[] = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data
      return;

    }
    this.dataSource.data = data.sort((a: Transaction, b: Transaction) => {
      const isAsc: boolean = sort.direction === 'asc';
      switch (sort.active) {
        case "Date":
          return compare(a.date, b.date, isAsc)
        case "Type":
          return compare(a.type, b.type, isAsc)
        case "Balance":
          return compare(a.balance, b.balance, isAsc)
        case "Balance Before":
          return compare(a.balanceBefore, b.balanceBefore, isAsc)
        case "Balance After":
          return compare(a.balanceAfter, b.balanceAfter, isAsc)
        default:
          return 0
      }
    })

    function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }
}
