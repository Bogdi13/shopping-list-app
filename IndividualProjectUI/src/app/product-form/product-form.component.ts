import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  private product!: Product;
  isEdit = false;

  constructor(
    public dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      quantity: new FormControl(0, [Validators.required]),
      price: new FormControl(0),
    });
    if (this.data) {
      if (this.data.product) {
        this.patchValue(this.data.product);
      }
      this.isEdit = this.data.isEdit;
    }
  }

  get value() {
    return new Product({
      id: this.product ? this.product.id : 0,
      name: this.productForm.value.name,
      quantity: this.productForm.value.quantity,
      price: this.productForm.value.price,
    });
  }

  patchValue(product: Product) {
    this.product = product;
    this.productForm.patchValue(product);
  }

  onSave() {
    this.dialogRef.close(this.value);
  }
}
