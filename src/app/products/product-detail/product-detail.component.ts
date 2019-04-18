import { Component, OnInit } from '@angular/core';
import { IProduct } from "../product";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../product.service";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMsg: string;

  constructor(private route: ActivatedRoute, private _productSvc: ProductService, private router: Router) {}

  ngOnInit() {
    //we do not expect the url to change,
    //so we can use snapshot and not observable
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this._productSvc.getProductDetails(id).subscribe( prodDetail => {
      this.product = prodDetail;
    },
      err => this.errorMsg = <any>err
    );

  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
