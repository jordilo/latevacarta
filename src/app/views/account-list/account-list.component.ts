import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/api/account';
import { AccountService } from 'src/app/api/account.service';
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css'],
})
export class AccountListComponent implements OnInit {

  public accounts$: Observable<IAccount[]>;

  constructor(private accountService: AccountService) {
  }

  public ngOnInit() {
    this.accounts$ = this.accountService.getAccounts();
  }

}
