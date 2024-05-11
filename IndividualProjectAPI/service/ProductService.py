from model.Product import Product


class ProductService:
    def __init__(self, product_repo, product_validator):
        self.__product_repo = product_repo
        self.__product_validator = product_validator

    def get_products(self) -> list[Product]:
        return self.__product_repo.get_products()

    def add_product(self, product: Product) -> Product:
        self.__product_validator.validateProduct(product)
        if self.__product_repo.get_product_by_name(product):
            raise Exception('Another product with this name already exists')
        return self.__product_repo.add_product(product)

    def update_product(self, id: int, product: Product) -> Product:
        self.__product_validator.validateProduct(product)
        if self.__product_repo.get_product_by_name(product):
            raise Exception('Another product with this name already exists')
        return self.__product_repo.update_product(id, product)

    def delete_product(self, id: int) -> int:
        return self.__product_repo.delete_product(id)
