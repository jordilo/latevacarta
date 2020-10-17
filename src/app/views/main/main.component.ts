import { Observable } from 'rxjs';
import { BusinessService } from './../../api/business.service';
import { Component, OnInit } from '@angular/core';
import { IBusiness } from '../../api/business';
import { AccountService } from '../../api/account.service';
import { IAccount } from 'src/app/api/account';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {

  public business$: Observable<IBusiness[]>;
  public account$: Observable<IAccount>;
  constructor(
    private accountService: AccountService,
    private businessService: BusinessService) {
  }

  public ngOnInit() {
    this.business$ = this.businessService.getAll();
    this.account$ = this.accountService.getAccount();
  }
}
