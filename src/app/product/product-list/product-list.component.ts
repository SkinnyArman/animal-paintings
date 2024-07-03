import { Component, OnInit, Signal, computed, signal } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../product.service';
import { MatCardModule } from '@angular/material/card';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../cart/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatSnackBarModule, MatInputModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  searchedValue = signal('');

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private snackbar: MatSnackBar
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products.set(data);
    });
  }
  bobby = computed(() => {
    const searchValue = this.searchedValue().toLowerCase();
    const filteredProducts = this.products().filter((product: Product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    return filteredProducts;
  });
  addToCart(product: Product) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.snackbar.open('Added to cart', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
      error: (error) => {
        this.snackbar.open('Failed to add to cart', '', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });
      },
    });
  }
  applyFiter(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchedValue.set(target.value);
  }
}
