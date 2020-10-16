import { BusinessService } from './../../api/business.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(private businessService: BusinessService) { }

  ngOnInit(): void {
  }

}
