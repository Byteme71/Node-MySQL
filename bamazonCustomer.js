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
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "firstQuestion",
                type: "list",
                message: "Which department would you like shop from?",
                choices: function () {
                    var choiceArray = [];
                    // console.log(results[0].department_name);
                    // console.log(results[3].department_name);
                    // console.log(results[6].department_name);
                    // console.log(results[9].department_name);
                    choiceArray.push(results[0].department_name, results[3].department_name, results[6].department_name, results[9].department_name);
                    // for (var i = 0; i < results.length; i++) {
                    //     choiceArray.push(results[i].department_name);
                        // console.log(results[0].department_name);
                        // console.log(results[3].department_name);
                    // }
                    return choiceArray;
                },
            }]).then(function (answer) {
                console.log(answer.firstQuestion)

                if (answer.firstQuestion === "pets") {

                    displayPets();
                    inquirer
                        .prompt([{
                            name: "secondQuestion",
                            type: "input",
                            message: "Choose from the below list and write the name of the item you would like to purchase:\n"
                        },

                        {
                            type: "input",
                            name: "secondQuestionPart2",
                            message: "How many would you like to purchase?",

                        }

                        ]).then(function (choicePets) {

                            // console.log(choicePets.secondQuestion)

                            var itemName = choicePets.secondQuestion;

                            console.log(itemName)

                            var itemQty = choicePets.secondQuestionPart2;

                            console.log(itemQty)

                            buyItem(itemQty, itemName);

                        })

                } else if (answer.firstQuestion === "home") {
                    inquirer
                        .prompt([{
                            name: "thirdQuestion",
                            type: "input",
                            message: "Choose from the folllowing list and write the name of the item you would like to purchase: " + displayHome(),
                        },

                        {
                            type: "input",
                            name: "thirdQuestionPart2",
                            message: "How many would you like to purchase?",

                        }

                        ]).then(function (choiceHome) {

                            // console.log(choiceHome.thirdQuestion)

                            var itemName = choiceHome.thirdQuestion;

                            console.log(itemName)

                            var itemQty = choiceHome.thirdQuestionPart2;

                            console.log(itemQty)

                        })

                } else if (answer.firstQuestion === "beauty") {
                    inquirer
                        .prompt([{
                            name: "fourthQuestion",
                            type: "input",
                            message: "Choose from the folllowing list and write the name of the item you would like to purchase: " + displayBeauty(),
                        },
                        {
                            type: "input",
                            name: "fourthQuestionPart2",
                            message: "How many would you like to purchase?",

                        }

                        ]).then(function (choiceBeauty) {

                            // console.log(choiceBeauty.fourthQuestion)

                            var itemName = choiceBeauty.fourthQuestion;

                            console.log(itemName)

                            var itemQty = choiceBeauty.fourthQuestionPart2;

                            console.log(itemQty)
                        })

                } else if (answer.firstQuestion === "electronics") {
                    inquirer
                        .prompt([{
                            name: "fifthQuestion",
                            type: "input",
                            message: "Choose from the folllowing list and write the name of the item you would like to purchase: " + displayElecs(),

                        },
                        {
                            type: "input",
                            name: "fifthQuestionPart2",
                            message: "How many would you like to purchase?",

                        }

                        ]).then(function (choiceElec) {

                            // console.log(choiceElec.fifthQuestion)

                            var itemName = choiceElec.fifthQuestion;

                            console.log(itemName)

                            var itemQty = choiceElec.fifthQuestionPart2;

                            console.log(itemQty)

                        })
                }
            });
    });
}

//ask the quantity of the product they want to buy

//subract the quantity from the quantity

function buyItem(quantity, item) {
    // if (quantity < 0){

    //     console.log("Sorry, we are out of stock")

    // }else if(quantity > 0){

        var query = connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                quantity: parseInt(quantity) /*- parseInt(itemQty),*/

            },
            {
                item: item
            },

        ],
        function (err, res) {

            // console.log("error:" + err )
            console.log(res + " products updated!\n");

            console.log("err" + err)
        }
    );
// }
    console.log(query.sql);
}


function displayPets() {

    connection.query("SELECT * FROM products WHERE department_name = \"pets\"", function (err, results) {
        if (err) throw err;

        var choiceArray2 = [];
        for (var x = 0; x < results.length; x++) {
            choiceArray2.push("Item id: " + results[x].item_id + " " + " product: " + results[x].product_name + " " + " price: $" + results[x].price + " " + results[x].stock_quantity + " in stock");

            console.log("\nItem id: " + results[x].item_id + " " + " product: " + results[x].product_name + " " + " price: $" + results[x].price + " " + results[x].stock_quantity + " in stock\n")
        }
        return choiceArray2;
    })
}

function displayHome() {

    connection.query("SELECT * FROM products WHERE department_name = \"home\"", function (err, results) {
        if (err) throw err;
        var choiceArray3 = [];
        for (var j = 0; j < results.length; j++) {
            choiceArray3.push("Item id: " + results[j].item_id + " " + " product: " + results[j].product_name + " " + " price: $" + results[j].price + " " + results[j].stock_quantity + " in stock");

            console.log("\nItem id: " + results[j].item_id + " " + " product: " + results[j].product_name + " " + " price: $" + results[j].price + " " + results[j].stock_quantity + " in stock\n")
        }
        return choiceArray3;
    })
}

function displayBeauty() {

    connection.query("SELECT * FROM products WHERE department_name = \"beauty\"", function (err, results) {
        if (err) throw err;
        var choiceArray4 = [];
        for (var h = 0; h < results.length; h++) {
            choiceArray4.push("Item id: " + results[h].item_id + " " + " product: " + results[h].product_name + " " + " price: $" + results[h].price + " " + results[h].stock_quantity + " in stock");

            console.log("\nItem id: " + results[h].item_id + " " + " product: " + results[h].product_name + " " + " price: $" + results[h].price + " " + results[h].stock_quantity + " in stock\n")
        }
        return choiceArray4;

    })
}

function displayElecs() {

    connection.query("SELECT * FROM products WHERE department_name = \"electronics\"", function (err, results) {
        if (err) throw err;
        var choiceArray5 = [];
        for (var d = 0; d < results.length; d++) {
            choiceArray5.push("Item id: " + results[d].item_id + " " + " product: " + results[d].product_name + " " + " price: $" + results[d].price + " " + results[d].stock_quantity + " in stock");

            console.log("\nItem id: " + results[d].item_id + " " + " product: " + results[d].product_name + " " + " price: $" + results[d].price + " " + results[d].stock_quantity + " in stock\n")
        }
        return choiceArray5;
    })
}





/////help below///////



function bidAuction() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM auctions", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_name);
                        }
                        return choiceArray;
                    },
                    message: "What auction would you like to place a bid in?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                // determine if bid was high enough
                if (chosenItem.highest_bid < parseInt(answer.bid)) {
                    // bid was high enough, so update db, let the user know, and start over
                    connection.query(
                        "UPDATE auctions SET ? WHERE ?",
                        [
                            {
                                highest_bid: answer.bid
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Bid placed successfully!");
                            start();
                        }
                    );
                }
                else {
                    // bid wasn't high enough, so apologize and start over
                    console.log("Your bid was too low. Try again...");
                    start();
                }
            });
    });
}
