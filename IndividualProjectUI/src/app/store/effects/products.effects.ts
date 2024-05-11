import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProductsService } from 'src/app/services/products.service';

import * as productsActions from '../actions/products.actions';
import { Product } from 'src/app/models/product.model';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.loadProducts),
      mergeMap(() =>
        this.productsService.loadProducts().pipe(
          map((data: any) =>
            productsActions.loadProductsSuccess({
              data: ProductsEffects.mapProducts(data),
            })
          ),
          catchError((error) =>
            of(productsActions.loadProductsFailure({ error }))
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.createProduct),
      mergeMap((action: any) =>
        this.productsService.createProduct(action.product).pipe(
          map((data: any) => {
            this.toastrService.success('Product created successfully', 'Succes', {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false,
              toastClass: 'toast toast-success'
            });
            return productsActions.createProductSuccess({
              data: ProductsEffects.mapProduct(data),
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.detail, 'Error', {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false,
              toastClass: 'toast toast-error'
            });
            return of(productsActions.createProductFailure({ error }));
          })
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.updateProduct),
      mergeMap((action: any) =>
        this.productsService.updateProduct(action.product).pipe(
          map((data: any) => {
            this.toastrService.success('Product updated successfully', 'Succes', {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false,
              toastClass: 'toast toast-success'
            });
            return productsActions.updateProductSuccess({
              data: ProductsEffects.mapProduct(data),
            });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.detail, 'Error', {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false,
              toastClass: 'toast toast-error'
            });
            return of(productsActions.updateProductFailure({ error }));
          })
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsActions.deleteProduct),
      mergeMap((action: any) =>
        this.productsService.deleteProduct(action.id).pipe(
          map((data: any) => {
            this.toastrService.success('Product deleted successfully', 'Succes', {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false,
              toastClass: 'toast toast-success'
            });
            return productsActions.deleteProductSuccess({ data });
          }),
          catchError((error) => {
            this.toastrService.error(error.error.detail, 'Error', {
              timeOut: 5000,
              progressBar: true,
              progressAnimation: 'increasing',
              tapToDismiss: false,
              toastClass: 'toast toast-error'
            });
            return of(productsActions.deleteProductFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private toastrService: ToastrService,
  ) {}

  private static mapProducts(data: any): Product[] {
    return data.map((product: any) => this.mapProduct(product));
  }

  private static mapProduct(data: any): Product {
    return new Product(data);
  }
}
