import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAccount } from 'src/app/api/account';
import { AccountService } from '../../api/account.service';
import { IBusiness } from '../../api/business';
import { BusinessService } from './../../api/business.service';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css'],
})
export class MainComponent implements OnInit {

  public business$: Observable<IBusiness[]>;
  public account$: Observable<IAccount>;
  public accounts$: Observable<IAccount[]>;

  constructor(
    private accountService: AccountService,
    private businessService: BusinessService) {
  }

  public ngOnInit() {
    this.business$ = this.businessService.getAll();
    this.account$ = this.accountService.getAccount();
    this.accounts$ = this.accountService.getAccounts();
  }

  public get isAdmin() {
    return this.accountService.isAdmin;
  }
}
