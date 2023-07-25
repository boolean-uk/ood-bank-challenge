import {Component, ViewChild} from '@angular/core';
import {BankStorageService} from "../../services/bank-storage.service";
import {MatSort, Sort} from "@angular/material/sort";
import {Transaction} from "../../interfaces/transaction";
import {MatTableDataSource} from "@angular/material/table";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-bank', templateUrl: './bank.component.html', styleUrls: ['./bank.component.scss']
})
export class BankComponent {

  columns: string[] = ["Date", "Type", "Balance", "Balance Before", "Balance After"]
  dataSource: MatTableDataSource<Transaction> = new MatTableDataSource<Transaction>([])
  @ViewChild(MatSort) sort: MatSort = new MatSort()

  range = new FormGroup({
    start: new FormControl<Date | null>(null), end: new FormControl<Date | null>(null),
  });

  constructor(private bankService: BankStorageService) {
    this.getBankHistory().subscribe((history: Transaction[]): void => {
      this.dataSource.data = history
      this.dataSource.sort = this.sort
    })
  }

  getBankBalance(): number {
    return this.bankService.balance
  }

  getBankHistory(): Observable<Transaction[]> {
    return this.bankService.getSortedHistory()

  }

  sortData(sort: Sort): void {
    const data: Transaction[] = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data
      return;

    }
    this.dataSource.data = data.sort((a: Transaction, b: Transaction): number => {
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

    function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean): number {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }
  }

  filterByDate(): void {
    const begin: Date = this.range.controls['start'].value!
    const end: Date = this.range.controls['end'].value!
    if (begin && end) {
      this.bankService.getSortedHistory().subscribe((transaction: Transaction[]): void => {
        this.dataSource.data = transaction.filter((transaction: Transaction) => transaction.date >= begin && transaction.date <= end)
      })
    }
  }

  clearFilterByDate() {
    this.bankService.getSortedHistory().subscribe((transaction: Transaction[]): void => {
      this.dataSource.data = transaction
    })
  }
}
