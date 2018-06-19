CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
item_id INTEGER AUTO_INCREMENT NOT NULL PRIMARY KEY,
product_name VARCHAR (100),
department_name VARCHAR (100),
price INT NOT NULL,
stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pet food", "pets", 25, 100), ("pet toys", "pets", 15, 150), 
("pet beds", "pets", 50, 120), ("dresser", "home", 150, 250),
("king sized bed", "home", 500, 100),("couch", "home", 1000, 150),
("mascara", "beauty", 50, 200),("lipstick", "beauty", 15, 250),
("moisturizer", "beauty", 45, 200),("tv", "electronics", 250, 700),
("xbox", "electronics", 400, 200), ("ipad", "electronics", 1500, 200),
("iphone", "electronics", 1500, 5), ("bluray player", "electronics", 800, 7);

SELECT * FROM products WHERE department_name = "home";

UPDATE products SET stock_quantity = 200
WHERE item_id =  1