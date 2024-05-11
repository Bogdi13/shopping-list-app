export class Product {
  id: number;
  name: string;
  quantity: number;
  price: number;

  constructor(product: any = {}) {
    this.id = product.id;
    this.name = product.name;
    this.quantity = product.quantity;
    this.price = product.price;
  }
}
