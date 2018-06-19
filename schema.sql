CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
product_name VARCHAR (100),
department_name VARCHAR (100),
price INT NOT NULL,
stock_quantity INT NOT NULL
);

