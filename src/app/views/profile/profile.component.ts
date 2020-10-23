import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../../api/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {
  public user$: Observable<any>;
  constructor(private accountService: AccountService) {

    this.user$ = this.accountService.getAccount();
  }
}
