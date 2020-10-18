import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProduct, ICategory } from '../../api/catalog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/api/business.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() public product: IProduct;
  @Input() public categories: ICategory[];

  @Output() public submitForm = new EventEmitter<IProduct>();
  public productForm: FormGroup;
  constructor(private fb: FormBuilder, private businessService: BusinessService) { }


  public ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [this.product?.id],
      name: [this.product?.name, Validators.required],
      description: [this.product?.description],
      category_id: [this.product?.category_id, Validators.required],
      is_active: [this.product?.is_active || true],
      feature_image: [this.product?.feature_image, ''],
      price: [this.product?.price]
    });
  }


  public sendForm() {
    this.submitForm.emit(this.productForm.value);
  }
}
