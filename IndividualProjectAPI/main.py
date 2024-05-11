import sqlite3
from typing import Any

from fastapi import FastAPI, Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.middleware.cors import CORSMiddleware

from model.Product import Product
from model.validator.ProductValidator import ProductValidator

from repository.ProductRepo import ProductRepo

from service.ProductService import ProductService

db_connection = sqlite3.connect('shoppingList.db')

app = FastAPI()

class AddCorsHeaderMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers["Access-Control-Allow-Origin"] = "*"
        return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(AddCorsHeaderMiddleware)

product_repo = ProductRepo(db_connection)
product_validator = ProductValidator()
product_service = ProductService(product_repo, product_validator)

@app.get("/products/", response_model=list[Product])
async def get_products() -> Any:
    return product_service.get_products()

@app.post("/products/", response_model=Product)
async def add_product(product: Product) -> Product:
    try:
        return product_service.add_product(product)
    except Exception as serviceException:
        raise HTTPException(status_code=400, detail=str(serviceException))

@app.put("/products/{id}", response_model=Product)
async def update_product(id: int, product: Product) -> Product:
    try:
        return product_service.update_product(id, product)
    except Exception as serviceException:
        raise HTTPException(status_code=400, detail=str(serviceException))

@app.delete("/products/{id}", response_model=int)
async def delete_product(id: int) -> int:
    try:
        return product_service.delete_product(id)
    except Exception as repoException:
        raise HTTPException(status_code=404, detail=str(repoException))

@app.on_event("shutdown")
async def shutdown():
    db_connection.close()