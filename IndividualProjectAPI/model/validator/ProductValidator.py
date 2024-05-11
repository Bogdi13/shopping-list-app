class ProductValidator:
    def validateProduct(self, product):
        if product.name is None or len(product.name)==0:
            raise Exception("Product name cannot be null or empty")
        if product.quantity < 0:
            raise Exception("Product quantity cannot be a negative number")
        if product.price < 0:
            raise Exception("Product price cannot be a negative number")