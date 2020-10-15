import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable } from 'rxjs';
import { AccountService } from '../api/account.service';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css']
})
export class ProfileComponent {
  public user$: Observable<any>;
  constructor(private auth: AuthService, private accountService: AccountService) {

    this.user$ = this.accountService.getAccount();
  }
}
