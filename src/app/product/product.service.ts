import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL = environment.apiUrl + '/products';

  constructor(private http: HttpClient) {}
  
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.API_URL);
  }
}
