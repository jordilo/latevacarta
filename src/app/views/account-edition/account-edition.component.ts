import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAccount } from 'src/app/api/account';
import { ToastService } from 'src/app/toast.service';
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
    private accountService: AccountService,
    private toast: ToastService) { }

  public ngOnInit(): void {
    this.account$ = this.accountService.getAccount();
  }

  public saveAccount(account: IAccount) {
    this.accountService.updateAccount(account)
      .pipe(tap(() => this.toast.open('Info', 'Profile saved successfully')))
      .subscribe(() => this.router.navigate(['../'], { relativeTo: this.activeRouter }));
  }

}
