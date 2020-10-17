import { AddressService } from './../../api/address.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { merge, Observable } from 'rxjs';
import { switchMap, } from 'rxjs/operators';
import { Business } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-business-edition',
  templateUrl: './business-edition.component.html',
  styleUrls: ['./business-edition.component.css']
})
export class BusinessEditionComponent implements OnInit {

  public business$: Observable<Business>;
  constructor(
    private router: ActivatedRoute,
    private businessService: BusinessService,
    private addressService: AddressService) { }

  public ngOnInit(): void {
    this.business$ = this.router.params
      .pipe(switchMap(({ id }) => this.businessService.getById(id)));
  }

  public editBusiness(business: Business) {
    merge(
      this.businessService.edit(business),
      this.addressService.updateAddress(business.address)
    ).subscribe();
  }
}
