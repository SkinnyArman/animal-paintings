import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../../models/product';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-view',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe,
  ],
  templateUrl: './cart-view.component.html',
  styleUrl: './cart-view.component.css',
})
export class CartViewComponent implements OnInit {
  cartItems: Product[] = [];

  constructor(private cartService: CartService) {}
  fetchData() {
    this.cartService.getCartItems().subscribe((data) => {
      this.cartItems = data;
    });
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (accumulator, currentValue) => accumulator + +currentValue.price,
      0
    );
  }

  clearCart(): void {
    this.cartService
      .clearCart(this.cartItems)
      .subscribe(() => this.fetchData());
  }

  ngOnInit(): void {
    this.fetchData();
  }
}
