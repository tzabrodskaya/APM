import {Component, OnInit} from "@angular/core";
import {IProduct} from "./product";
import {ProductService} from "./product.service";

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService]
})
export class ProductListComponent implements OnInit{
  pageTitle: string = 'Product List';
  imageWidth: number = 40;
  imageMargin: number = 40;
  showImage: boolean = false;
  _listFilter: string ;
  filteredProducts: IProduct[];
  products: IProduct[];
  errorMsg: string;

  constructor (private _productSvc: ProductService) {}

  toggleImage(): void {
    this.showImage = !this.showImage;

  }

  ngOnInit(): void {
    this._productSvc.getProducts().subscribe(prod => {
      this.products = prod;
      this._listFilter = "cart"; //for some reason setter is not called, need a prod build?
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    },
        err => this.errorMsg = <any>err
    );

  }

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter): this.products;
  }

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((product: IProduct) => product.productName.toLowerCase().indexOf(filterBy) !== -1);
  }

  onRatingClicked(message: string): void {
      this.pageTitle += ': ' + message;
  }
}
