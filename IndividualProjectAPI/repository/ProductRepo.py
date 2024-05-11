from model.Product import Product


class ProductRepo:
    def __init__(self, connection):
        self.__connection = connection

    def get_products(self) -> list[Product]:
        try:
            cursor = self.__connection.cursor()
            cursor.execute('SELECT * FROM Products')
            rows = cursor.fetchall()
            products = []
            for row in rows:
                product = Product(id=row[0], name=row[1], quantity=row[2], price=row[3])
                products.append(product)
            cursor.close()
            return products
        except Exception as sqliteException:
            raise Exception("[DB exception] on get all products", str(sqliteException))

    def add_product(self, product: Product) -> Product:
        try:
            cursor = self.__connection.cursor()
            cursor.execute(
                'INSERT INTO Products (name, quantity, price) VALUES '
                '(?, ?, ?)',
                (product.name, product.quantity, product.price)
            )
            self.__connection.commit()
            return self.__get_product_by_id(cursor.lastrowid)
        except Exception as sqliteException:
            raise Exception("[DB exception] on add product", str(sqliteException))

    def update_product(self, id: int, product: Product) -> Product:
        try:
            cursor = self.__connection.cursor()
            cursor.execute(
                'UPDATE Products SET name=?, quantity=?, price=? WHERE id=?',
                (product.name, product.quantity, product.price, id)
            )
            self.__connection.commit()
            return self.__get_product_by_id(id)
        except Exception as sqliteException:
            raise Exception("[DB exception] on update product", str(sqliteException))

    def delete_product(self, id: int) -> int:
        try:
            cursor = self.__connection.cursor()
            cursor.execute('DELETE FROM Products WHERE id=?', (id,))
            self.__connection.commit()
            return id
        except Exception as sqliteException:
            raise Exception("[DB exception] on delete product", str(sqliteException))

    def get_product_by_name(self, product: Product) -> Product:
        try:
            cursor = self.__connection.cursor()
            cursor.execute('SELECT * FROM Products Where name=? and id!=?', (product.name, product.id))
            row = cursor.fetchone()
            if row:
                product = Product(id=row[0], name=row[1], quantity=row[2], price=row[3])
                return product
        except Exception as sqliteException:
            raise Exception("[DB exception] on get by name", str(sqliteException))

    def __get_product_by_id(self, id: int) -> Product:
        try:
            cursor = self.__connection.cursor()
            cursor.execute('SELECT * FROM Products Where Id=?', (id,))
            row = cursor.fetchone()
            if row:
                product = Product(id=row[0], name=row[1], quantity=row[2], price=row[3])
            else:
                raise Exception(f"Product with id {id} not fount", id)
            return product
        except Exception as sqliteException:
            raise Exception("[DB exception] on get by id", str(sqliteException))
