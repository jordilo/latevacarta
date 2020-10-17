import { BusinessService } from './../../api/business.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/api/business';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-detail',
  templateUrl: './business-detail.component.html',
  styleUrls: ['./business-detail.component.css']
})
export class BusinessDetailComponent implements OnInit {

  public business$: Observable<Business>;
  constructor(private router: ActivatedRoute, private businessService: BusinessService) { }

  public ngOnInit(): void {
    this.business$ = this.router.params
      .pipe(switchMap(({ id }) => this.businessService.getById(id)));
  }

}
