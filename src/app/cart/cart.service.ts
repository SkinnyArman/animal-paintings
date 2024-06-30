import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartUrl = environment.apiUrl + 'cart';
  private checkoutUrl = environment.apiUrl + 'checkout'

  constructor(private http: HttpClient) {}
  
  addToCart(product: Product): Observable<Product> {
    return this.http.post<Product>(this.cartUrl, product)
  }

  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.cartUrl)
  }

  clearCart(products: Product[]): Observable<void[]> {
    const deleteRequests = products.map((product: Product) => this.http.delete<void>(`${this.cartUrl}/${product.id}`));
    return forkJoin(deleteRequests);
  }

  checkout(products: Product[]) {
    this.http.post(this.checkoutUrl, products)
  }
}
