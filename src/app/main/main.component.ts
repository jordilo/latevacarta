import { Observable } from 'rxjs';
import { BusinessService } from './../api/business.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AuthRoutes } from '../../auth/auth.routes';
import { Business } from '../api/business';

@Component({
  selector: 'app-main',
  templateUrl: 'main.component.html',
  styleUrls: ['main.component.css']
})
export class MainComponent implements OnInit {

  public business$: Observable<Business[]>;
  constructor(private businessService: BusinessService) {
  }

  public ngOnInit() {
    this.business$ = this.businessService.getBusiness();
  }
}
