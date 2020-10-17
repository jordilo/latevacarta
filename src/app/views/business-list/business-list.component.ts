import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../api/business.service';
import { Business } from 'src/app/api/business';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {

  public business$: Observable<Business[]>;
  constructor(private businessService: BusinessService) {
  }

  public ngOnInit() {
    this.business$ = this.businessService.getAll();
  }

  public removeBusiness(businessId: string) {
    const userWantsToDelete = confirm('Are you sure...');
    if (userWantsToDelete) {
      this.businessService.remove(businessId).subscribe();
    }
  }

}
