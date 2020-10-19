import { AddressService } from './../../api/address.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IBusiness } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-business-edition',
  templateUrl: './business-edition.component.html',
  styleUrls: ['./business-edition.component.css']
})
export class BusinessEditionComponent implements OnInit {

  public business$: Observable<IBusiness>;
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private addressService: AddressService) { }

  public ngOnInit(): void {
    // TODO fins the way to extract params from parent
    this.business$ = this.activeRouter.parent.params
      .pipe(switchMap(({ businessId }) => this.businessService.getById(businessId)));
  }

  public editBusiness(business: IBusiness) {
    forkJoin([
      this.businessService.edit(business),
      this.addressService.updateAddress(business.address)
    ]
    ).subscribe(() => this.router.navigate(['/business']));
  }
}
