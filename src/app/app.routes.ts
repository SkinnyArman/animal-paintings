import { Routes } from '@angular/router';
import { ProductListComponent } from './product/product-list/product-list.component';

enum RoutesEnum {
  Products = 'products',
}

export const routes: Routes = [
  { path: '', redirectTo: `/${RoutesEnum.Products}`, pathMatch: 'full' },
  { path: `${RoutesEnum.Products}`, component: ProductListComponent },
];
