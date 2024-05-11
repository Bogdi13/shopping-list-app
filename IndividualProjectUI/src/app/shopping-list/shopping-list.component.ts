import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { ProductFormComponent } from '../product-form/product-form.component';

import * as fromProducts from '../store/reducers/products.reducers';

import {
  createProduct,
  deleteProduct,
  loadProducts,
  updateProduct,
} from '../store/actions/products.actions';

import { Product } from '../models/product.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<Product[]>;

  productsTableData$: Observable<Product[]>;
  productsDataLoading$: Observable<boolean>;

  displayedColumns: string[] = [
    'id',
    'name',
    'quantity',
    'price',
    'edit',
    'delete',
  ];

  constructor(private store: Store<any>, private dialog: MatDialog) {
    this.productsTableData$ = this.store.pipe(select(fromProducts.getProducts));
    this.productsDataLoading$ = this.store.pipe(select(fromProducts.isLoading));
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  addProduct() {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.store.dispatch(createProduct({ product: payload }));
      }
    });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      data: { product: product, isEdit: true },
    });
    dialogRef.afterClosed().subscribe((payload) => {
      if (payload) {
        this.store.dispatch(updateProduct({ product: payload }));
      }
    });
  }

  deleteProduct(product: Product) {
    this.store.dispatch(deleteProduct({ id: product.id }));
  }

  private loadProducts() {
    this.store.dispatch(loadProducts());
  }
}
