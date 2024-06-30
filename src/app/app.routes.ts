import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';

export enum RoutesEnum {
  Products = 'products',
  Cart = 'cart'
}

export const routes: Routes = [
  { path: '', redirectTo: `/${RoutesEnum.Products}`, pathMatch: 'full' },
  { path: `${RoutesEnum.Products}`, component: ProductListComponent },
  { path: `${RoutesEnum.Cart}`, component: CartViewComponent}
];
