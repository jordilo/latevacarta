import { MetadataService } from './../../api/metadata.service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../api/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddress, IBusiness } from 'src/app/api/business';
import { ILanguage } from 'src/app/api/metadata';

@Component({
  selector: 'app-business-creation',
  templateUrl: './business-creation.component.html',
  styleUrls: ['./business-creation.component.css']
})
export class BusinessCreationComponent implements OnInit {

  public languages$: Observable<ILanguage[]>;
  public defaultBusiness: IBusiness;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private businessService: BusinessService,
    private metadata: MetadataService
  ) { }

  public ngOnInit(): void {

    this.languages$ = this.metadata.getLanguages();
    this.defaultBusiness = {
      name: '',
      type: 'BAR',
      address: {
        country: 1
      } as IAddress
    } as IBusiness;

  }

  public sendForm(business: IBusiness) {
    this.businessService.create(business)
      .subscribe(({ id }) => this.router.navigate(['../', id], { relativeTo: this.activeRoute }));
  }

}
