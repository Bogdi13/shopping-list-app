import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

import * as productsActions from '../actions/products.actions';

export const productsFeatureKey = 'products';

export interface ProductsState {
  products: Product[];
  isLoading: boolean;
  error: any;
}

export const initialState: ProductsState = {
  products: [],
  isLoading: false,
  error: null,
};

const productReducer = createReducer(
  initialState,

  //Load Products
  on(productsActions.loadProducts, (state) => ({
    ...state,
    products: [],
    isLoading: true,
  })),
  on(productsActions.loadProductsSuccess, (state, { data }) => ({
    ...state,
    products: data,
    isLoading: false,
  })),
  on(productsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  //Create Product
  on(productsActions.createProduct, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(productsActions.createProductSuccess, (state, { data }) => ({
    ...state,
    products: state.products?.concat([data]),
    isLoading: false,
  })),
  on(productsActions.createProductFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  //Update Product
  on(productsActions.updateProduct, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(productsActions.updateProductSuccess, (state, { data }) => ({
    ...state,
    products: state.products?.map((product) =>
      product.id === data.id ? data : product
    ),
    isLoading: false,
  })),
  on(productsActions.updateProductFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  //Delete Product
  on(productsActions.deleteProduct, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(productsActions.deleteProductSuccess, (state, { data }) => ({
    ...state,
    products: state.products?.filter((product) => product.id !== data),
    isLoading: false,
  })),
  on(productsActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);

export function reducer(state: ProductsState | undefined, action: Action) {
  return productReducer(state, action);
}

export const getProductsState =
  createFeatureSelector<ProductsState>(productsFeatureKey);
export const getProducts = createSelector(
  getProductsState,
  (state: ProductsState) => state.products
);
export const isLoading = createSelector(
  getProductsState,
  (state: ProductsState) => state.isLoading
);
export const error = createSelector(
  getProductsState,
  (state: ProductsState) => state.error
);
