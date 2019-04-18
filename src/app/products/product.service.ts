import {Injectable} from "@angular/core";
import {IProduct} from "./product";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {catchError, map, tap} from "rxjs/operators";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('api/products/products.json').pipe(
                tap(data => console.log ('All: ' + JSON.stringify(data))),
                catchError(this.handleError)
    );
  }

  getProductDetails(id: number): Observable<IProduct> {
    return this.getProducts().pipe(
      map((data: IProduct[]) => data.find(product => product.productId === id)));
  }


  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) { //client-side error
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`; //backend error
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
