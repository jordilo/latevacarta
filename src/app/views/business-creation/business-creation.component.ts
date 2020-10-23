import { ActivatedRoute, Router } from '@angular/router';
import { BusinessService } from '../../api/business.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAddress, IBusiness } from 'src/app/api/business';

@Component({
  selector: 'app-business-creation',
  templateUrl: './business-creation.component.html',
  styleUrls: ['./business-creation.component.css']
})
export class BusinessCreationComponent implements OnInit {

  public defaultBusiness: IBusiness;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private businessService: BusinessService) { }

  public ngOnInit(): void {
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
