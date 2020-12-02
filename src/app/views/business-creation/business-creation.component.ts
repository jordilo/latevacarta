import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IAddress, IBusiness } from 'src/app/api/business';
import { ILanguage } from 'src/app/api/metadata';
import { BusinessService } from '../../api/business.service';
import { ToastService } from '../../toast.service';
import { MetadataService } from './../../api/metadata.service';

@Component({
  selector: 'app-business-creation',
  templateUrl: './business-creation.component.html',
  styleUrls: ['./business-creation.component.css'],
})
export class BusinessCreationComponent implements OnInit {

  public languages$: Observable<ILanguage[]>;
  public defaultBusiness: IBusiness;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private businessService: BusinessService,
    private metadata: MetadataService,
    private toast: ToastService,
  ) { }

  public ngOnInit(): void {

    this.languages$ = this.metadata.getLanguages();
    this.defaultBusiness = {
      name: '',
      type: 'BAR',
      address: {
        country: 1,
      } as IAddress,
    } as IBusiness;

  }

  public sendForm(business: IBusiness) {
    this.businessService.create(business)
      .pipe(tap(() => this.toast.open('Info', 'Business created successfully')))
      .subscribe(({ id }) => this.router.navigate(['../', id], { relativeTo: this.activeRoute }));
  }

}
