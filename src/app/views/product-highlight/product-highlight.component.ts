import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { CatalogService } from 'src/app/api/catalog.service';
import { IProduct } from './../../api/catalog.d';

const MAX_HIGHLIGHTED_PRODUCTS = 4;

@Component({
  selector: 'app-product-highlight',
  templateUrl: './product-highlight.component.html',
  styleUrls: ['./product-highlight.component.css'],
})
export class ProductHighlightComponent implements OnInit {

  public highlightedProducts$: Observable<AbstractControl[]>;
  public products$: Observable<IProduct[]>;
  public form: FormArray;

  public get canAddMore(): boolean {
    return this.form?.value?.length < MAX_HIGHLIGHTED_PRODUCTS;
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private catalogService: CatalogService) { }

  public ngOnInit(): void {

    this.form = this.fb.array([]);

    this.highlightedProducts$ = this.activatedRoute.params
      .pipe(
        switchMap(({ businessId }) => this.catalogService.getHightlightProducts(businessId)),
        tap((products) => products.map((prod) => this.form.push(this.fb.control(prod.product_id)))),
        map(() => this.form.controls),
      );
    this.products$ = this.activatedRoute.params
      .pipe(switchMap(({ businessId }) => this.catalogService.getProducts(businessId)),
    );
  }

  public add() {
    if (this.canAddMore) {
      this.form.push(this.fb.control(''));
    }
  }

  public remove(index: number) {
    this.form.removeAt(index);
  }

  public sendForm() {
    const businessId = (this.activatedRoute.params as any).value.businessId;
    this.catalogService.addHighlightProducts(this.form.value, businessId)
      .subscribe(() => this.router.navigate(['../../'], { relativeTo: this.activatedRoute }));
  }

}
