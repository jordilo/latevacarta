import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../api/account.service';
import { IAccount } from 'src/app/api/account';

@Component({
  selector: 'app-account-edition',
  templateUrl: './account-edition.component.html',
  styleUrls: ['./account-edition.component.css']
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
