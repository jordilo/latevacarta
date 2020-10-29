import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/api/account';
import { AccountService } from '../../api/account.service';

@Component({
  selector: 'app-account-edition',
  templateUrl: './account-edition.component.html',
  styleUrls: ['./account-edition.component.css'],
})
export class AccountEditionComponent implements OnInit {

  public account$: Observable<IAccount>;
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private accountService: AccountService) { }

  public ngOnInit(): void {
    this.account$ = this.accountService.getAccount();
  }

  public saveAccount(account: IAccount) {
    this.accountService.updateAccount(account)
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.activeRouter }));
  }

}
