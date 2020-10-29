import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IBusiness } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';
import { ILanguage } from 'src/app/api/metadata';
import { MetadataService } from 'src/app/api/metadata.service';
import { AddressService } from './../../api/address.service';

@Component({
  selector: 'app-business-edition',
  templateUrl: './business-edition.component.html',
  styleUrls: ['./business-edition.component.css'],
})
export class BusinessEditionComponent implements OnInit {

  public data$: Observable<[IBusiness, ILanguage[]]>;
  public languages$: Observable<ILanguage[]>;
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private addressService: AddressService,
    private metadata: MetadataService) { }

  public ngOnInit(): void {
    // TODO fins the way to extract params from parent
    this.data$ = this.activeRouter.params
      .pipe(mergeMap(({ businessId }) => {
        return combineLatest([
          this.businessService.getById(businessId),
          this.metadata.getLanguages(),
        ]);
      },
      ));
  }

  public editBusiness(business: IBusiness) {
    forkJoin([
      this.businessService.edit(business),
      this.businessService.setMetadata(business.business_meta, business.id),
      this.addressService.updateAddress(business.address),
    ],
    ).subscribe(() => this.router.navigate(['/business']));
  }
}
