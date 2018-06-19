var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "password",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    startFirst();
});

function startFirst() {
    inquirer
        .prompt([{
            type: "list",
            name: "whatDoYouWant",
            message: "What would you like to do?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }]).then(function (firstAnswer) {
            // { whatDoYouWant: 'Add to Inventory' }
            // console.log(firstAnswer);

            switch (firstAnswer.whatDoYouWant) {
                case "View Products for Sale":
                    console.clear();
                    viewInven();
                    whatNext();
                    break;
                case "View Low Inventory":
                    console.clear();
                    viewLowStock();
                    whatNext();
                    break;
                case "Add to Inventory":
                    console.clear();
                    viewInven();
                    addInven();
                    // whatNext();
                    break;
                case "Add New Product":
                    console.clear();
                    addItem();
                    // whatNext();
                    break;
            }
        });
}

function viewInven() {
    connection.query("SELECT * FROM products", function (err, results) {
        console.log(JSON.stringify(results, null, 3));
    });
}

function viewLowStock() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, results) {
        console.log(JSON.stringify(results, null, 2))
    });
}


function addInven() {

    inquirer
        .prompt([{
                type: "input",
                name: "id",
                message: "Which product ID would you like to update the stock of?"
            },
            {
                type: "input",
                name: "quantity",
                message: "What is the new stock quantity total?"
            }
        ]).then(function (userInput) {

            connection.query(
                "UPDATE products SET ?  WHERE ?", [{
                        "stock_quantity": userInput.quantity
                    },
                    {
                        "item_id": userInput.id
                    }
                ],
                function (error, res) {
                    if (error) throw err;
                    console.log(res.affectedRows + " Successfully updated the quantity!")
                    whatNext();
                }
            );
        });
}




function addItem() {
    inquirer
        .prompt([{
                type: "input",
                name: "productName",
                message: "What is the name of the product you would like to add?"
            },
            {
                type: "input",
                name: "depName",
                message: "What department should this product be in?"
            },
            {
                type: "input",
                name: "price",
                message: "What should the price of the new product be?"
            },
            {
                type: "input",
                name: "stock",
                message: "How much stock should we add of the new product?"
            }
        ]).then(function (answer) {

            connection.query(
                "INSERT INTO products SET ? ", {
                    "product_name": answer.productName,
                    "department_name": answer.depName,
                    "price": parseInt(answer.price),
                    "stock_quantity": parseInt(answer.stock)
                },

                function (err, res) {
                    if (err) throw error;

                    console.log(res.affectedRows + " Successfully added this product!")
                    whatNext();
                }


            )
        })
}

function whatNext() {
    inquirer
        .prompt([{
            type: "list",
            name: "whatsNext",
            message: "Would you like to do, continue or exit?",
            choices: ["Continue", "Exit"]
        }, ]).then(function (yesOrNo) {
            switch (yesOrNo.whatsNext) {
                case "Continue":
                    console.clear();
                    startFirst();
                    break;
                case "Exit":
                    console.log("Goodbye");
                    connection.end();
                    break;
            }
        });
}