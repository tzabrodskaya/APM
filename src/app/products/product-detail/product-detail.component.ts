import { Component, OnInit } from '@angular/core';
import { IProduct } from "../product";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    //we do not expect the url to change,
    //so we can use snapshot and not observable
    const id = +this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.product = new class implements IProduct {
      description: string;
      imageUrl: string;
      price: number;
      productCode: string;
      productId: number;
      productName: string;
      releaseDate: string;
      starRating: number;
    };

  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
