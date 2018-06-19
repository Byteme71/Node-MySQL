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
                    break;
                case "View Low Inventory":
                    console.clear();
                    viewLowStock();
                    break;
                case "Add to Inventory":
                    console.clear();
                    addInven();
                    break;
                case "Add New Product":
                    console.clear();

            }
        });
}

function viewInven() {
    connection.query("SELECT * FROM products", function (err, results) {
        // var inventoryArray = [];
        // for (var i = 0; i < results.length; i++) {
        //     inventoryArray.push(results[i]);
        // }
        // console.log(JSON.stringify(res, null, 2))
        console.log(JSON.stringify(results, null, 3));
    });
}

function viewLowStock() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 10", function (err, results) {
        // var lowFoodInven = [];
        // for (var i = 0; i < results.length; i++) {
        //     lowFoodInven.push(results[i]);
        // }
        console.log(JSON.stringify(results, null, 2))
    });
}


function addInven() {
    viewInven();
    inquirer
        .prompt([{
                type: "input",
                name: "id",
                message: "Which product ID would you like to add stock to?"
            },
            {
                type: "input",
                name: "quantity",
                message: "How much stock would you like to replenish?"
            }
        ]).then(function (userInput) {

            connection.query(
                "UPDATE products SET ?  WHERE ?", [
                    {
                        "stock_quantity": userInput.quantity
                    },
                    {
                        "item_id": userInput.id
                    }
                ],
                function (error) {
                    if (error) throw err;
                    console.log(res.affectedRows + "Successfully updated the quantity!")
                }
            );
        });
}




function addItem(){
// connection.query("INSERT INTO porducts (product_name, department_name, price, stock_quantity VALUES ?", function (err, results) {


}