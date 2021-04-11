import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, forkJoin, Observable } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { IBusiness, ITemplate } from 'src/app/api/business';
import { BusinessService } from 'src/app/api/business.service';
import { ILanguage } from 'src/app/api/metadata';
import { MetadataService } from 'src/app/api/metadata.service';
import { AddressService } from './../../api/address.service';
import { ToastService } from './../../toast.service';

@Component({
  selector: 'app-business-edition',
  templateUrl: './business-edition.component.html',
  styleUrls: ['./business-edition.component.css'],
})
export class BusinessEditionComponent implements OnInit {

  public data$: Observable<[IBusiness, ILanguage[]]>;
  public languages$: Observable<ILanguage[]>;
  public templates$: Observable<ITemplate[]>;

  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private businessService: BusinessService,
    private addressService: AddressService,
    private metadata: MetadataService,
    private toast: ToastService,
  ) { }

  public ngOnInit(): void {
    this.data$ = this.activeRouter.params
      .pipe(mergeMap(({ businessId }) => {
        return combineLatest([
          this.businessService.getById(businessId),
          this.metadata.getLanguages(),
        ]);
      },
      ));

    this.templates$ = this.metadata.getTemplates();
  }

  public editBusiness(business: IBusiness) {
    forkJoin([
      this.businessService.edit(business),
      this.businessService.setMetadata(business.business_meta, business.id),
      this.addressService.updateAddress(business.address),
    ],
    ).pipe(tap((d) => {
      this.toast.open('Info', 'Business saved successfully');
    })).subscribe(() => this.router.navigate(['/business']));
  }
}
