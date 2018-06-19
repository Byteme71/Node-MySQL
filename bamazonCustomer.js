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
    console.clear();
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: "firstQuestion",
                type: "list",
                message: "Which department would you like shop from?",
                choices: function () {
                    var choiceArray = [];
                    choiceArray.push(results[0].department_name, results[3].department_name, results[6].department_name, results[9].department_name);

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
                                message: "\nChoose from the below list and write the ID number of the item you would like to purchase:\n",
                            },

                            {
                                type: "input",
                                name: "secondQuestionPart2",
                                message: "How many would you like to purchase?",

                            }

                        ]).then(function (choicePets) {
                            var query = connection.query("SELECT * FROM products", function (err, results) {
                                if (err) throw err;

                                // console.log(choicePets.secondQuestion)

                                var itemId = choicePets.secondQuestion;

                                // console.log(itemId)

                                var itemQty = choicePets.secondQuestionPart2;

                                // console.log(itemQty)



                                var chosenItem;
                                for (var i = 0; i < results.length; i++) {
                                    // console.log(results[i].item_id)
                                    // console.log(itemId)
                                    if (results[i].item_id === parseInt(itemId)) {
                                        chosenItem = results[i];
                                    }
                                }
                                // console.log(chosenItem)



                                if (parseInt(itemQty) < chosenItem.stock_quantity) {

                                    connection.query("UPDATE products SET ? WHERE ?", [{
                                                stock_quantity: chosenItem.stock_quantity - parseInt(itemQty),
                                            },
                                            {
                                                item_id: chosenItem.item_id
                                            },

                                        ],
                                        function (err, res) {
                                            var newPrice = chosenItem.price * itemQty;
                                            console.log(res.affectedRows + " products updated!\n Your total is $" + newPrice  + "\n");
                                            askAgain()
                                            // console.log("err" + err)
                                        }
                                    );

                                    // console.log(query.sql);
                                } else if (itemQty > chosenItem.stock_quantity) {
                                    console.log("Sorry, we are out of stock of " + chosenItem.item_name + "\n")
                                    askAgain()
                                } else if (itemId !== chosenItem.item_id) {
                                    console.log("We do not carry this!\n")
                                    askAgain()
                                }

                            })

                        })

                } else if (answer.firstQuestion === "home") {
                    displayHome();
                    inquirer
                        .prompt([{
                                name: "thirdQuestion",
                                type: "input",
                                message: "\nChoose from the below list and write the ID number of the item you would like to purchase:\n",
                            },

                            {
                                type: "input",
                                name: "thirdQuestionPart2",
                                message: "How many would you like to purchase?",

                            }

                        ]).then(function (choiceHome) {

                            var query = connection.query("SELECT * FROM products", function (err, results) {
                                if (err) throw err;

                                // console.log(choiceHome.thirdQuestion)

                                var itemId = choiceHome.thirdQuestion;

                                // console.log(itemId)

                                var itemQty = choiceHome.thirdQuestionPart2;

                                // console.log(itemQty)

                                var chosenItem;
                                for (var i = 0; i < results.length; i++) {
                                    // console.log(results[i].item_id)
                                    // console.log(itemId)
                                    if (results[i].item_id === parseInt(itemId)) {
                                        chosenItem = results[i];
                                    }
                                }
                                if (parseInt(itemQty) < chosenItem.stock_quantity) {

                                    connection.query("UPDATE products SET ? WHERE ?", [{
                                                stock_quantity: chosenItem.stock_quantity - parseInt(itemQty),
                                            },
                                            {
                                                item_id: chosenItem.item_id
                                            },

                                        ],
                                        function (err, res) {
                                            var newPrice = chosenItem.price * itemQty;
                                            console.log(res.affectedRows + " products updated!\n Your total is $" + newPrice + "\n");
                                            askAgain()
                                            // console.log("err" + err)
                                        }
                                    );

                                    // console.log(query.sql);
                                } else if (itemQty > chosenItem.stock_quantity) {
                                    console.log("Sorry, we are out of stock of " + chosenItem.item_name + "\n")
                                    askAgain()
                                } else if (itemId !== chosenItem.item_id) {
                                    console.log("We do not carry this!")
                                    askAgain()
                                }

                            })

                        })

                } else if (answer.firstQuestion === "beauty") {
                    displayBeauty();
                    inquirer
                        .prompt([{
                                name: "fourthQuestion",
                                type: "input",
                                message: "\nChoose from the below list and write the ID number of the item you would like to purchase:\n",
                            },
                            {
                                type: "input",
                                name: "fourthQuestionPart2",
                                message: "How many would you like to purchase?",

                            }

                        ]).then(function (choiceBeauty) {

                            var query = connection.query("SELECT * FROM products", function (err, results) {
                                if (err) throw err;


                                // console.log(choiceBeauty.fourthQuestion)

                                var itemId = choiceBeauty.fourthQuestion;

                                // console.log(itemId)

                                var itemQty = choiceBeauty.fourthQuestionPart2;

                                // console.log(itemQty)

                                var chosenItem;
                                for (var i = 0; i < results.length; i++) {
                                    // console.log(results[i].item_id)
                                    // console.log(itemId)
                                    if (results[i].item_id === parseInt(itemId)) {
                                        chosenItem = results[i];
                                    }
                                }
                                if (parseInt(itemQty) < chosenItem.stock_quantity) {

                                    connection.query("UPDATE products SET ? WHERE ?", [{
                                                stock_quantity: chosenItem.stock_quantity - parseInt(itemQty),
                                            },
                                            {
                                                item_id: chosenItem.item_id
                                            },

                                        ],
                                        function (err, res) {
                                            var newPrice = chosenItem.price * itemQty;
                                            console.log(res.affectedRows + " products updated!\n Your total is $" + newPrice + "\n");
                                            askAgain()
                                            // console.log("err" + err)
                                        }
                                    );

                                    // console.log(query.sql);
                                } else if (itemQty > chosenItem.stock_quantity) {
                                    console.log("Sorry, we are out of stock of " + chosenItem.item_name + "\n")
                                    askAgain()
                                } else if (itemId !== chosenItem.item_id) {
                                    console.log("We do not carry this!")
                                    askAgain()
                                }

                            })


                        })

                } else if (answer.firstQuestion === "electronics") {
                    displayElecs();
                    inquirer
                        .prompt([{
                                name: "fifthQuestion",
                                type: "input",
                                message: "\nChoose from the below list and write the ID number of the item you would like to purchase:\n",

                            },
                            {
                                type: "input",
                                name: "fifthQuestionPart2",
                                message: "How many would you like to purchase?",

                            }

                        ]).then(function (choiceElec) {

                            var query = connection.query("SELECT * FROM products", function (err, results) {
                                if (err) throw err;


                                // console.log(choiceElec.fifthQuestion)

                                var itemId = choiceElec.fifthQuestion;

                                // console.log(itemId)

                                var itemQty = choiceElec.fifthQuestionPart2;

                                // console.log(itemQty)



                                var chosenItem;
                                for (var i = 0; i < results.length; i++) {
                                    // console.log(results[i].item_id)
                                    // console.log(itemId)
                                    if (results[i].item_id === parseInt(itemId)) {
                                        chosenItem = results[i];
                                    }
                                }
                                if (parseInt(itemQty) < chosenItem.stock_quantity) {

                                    connection.query("UPDATE products SET ? WHERE ?", [{
                                                stock_quantity: chosenItem.stock_quantity - parseInt(itemQty),
                                            },
                                            {
                                                item_id: chosenItem.item_id
                                            },

                                        ],
                                        function (err, res) {
                                            var newPrice = chosenItem.price * itemQty;
                                            console.log(res.affectedRows + " products updated!\n Your total is $" + newPrice + "\n");
                                            askAgain()
                                            // console.log("err" + err)
                                        }
                                    );

                                    // console.log(query.sql);
                                } else if (itemQty > chosenItem.stock_quantity) {
                                    console.log("Sorry, we are out of stock of " + chosenItem.item_name + "\n")
                                    askAgain()
                                } else if (itemId !== chosenItem.item_id) {
                                    console.log("We do not carry this!")
                                    askAgain()
                                }

                            })

                        })
                }
            });
    });
}


// function buyItem(quantity, item) {

//     var query = connection.query("SELECT * FROM products", function (err, results) {
//         if (err) throw err;

//         var chosenItem;
//         for (var i = 0; i < results.length; i++) {
//             // console.log(results[i].item_id)
//             // console.log(itemId)
//             if (results[i].item_id === parseInt(itemId)) {
//                 chosenItem = results[i];
//             }
//         }
//         console.log(chosenItem)

//     })

//     if (itemQty < chosenItem.stock_quantity) {

//         connection.query("UPDATE products SET ? WHERE ?", [
//                 {
//                     stock_quantity: chosenItem.stock_quantity - parseInt(itemQty),
//                 },
//                 {
//                     item_id: parseInt(item)
//                 },

//             ],
//             function (err, res) {

//                 // console.log("error:" + err )
//                 console.log(res + " products updated!\n");

//                 console.log("err" + err)
//             }
//         );
//         // }
//         console.log(query.sql);
//     } else if (itemQty > chosenItem.stock_quantity) {
//         console.log("Sorry, we are out of stock of " + chosenItem.item_name)
//     } else if (itemId !== chosenItem.item_id) {
//         console.log("We do not carry this!")
//     }
// }


function displayPets() {
    console.clear();

    connection.query("SELECT * FROM products WHERE department_name = \"pets\"", function (err, results) {
        if (err) throw err;

        var choiceArray2 = [];
        for (var x = 0; x < results.length; x++) {
            choiceArray2.push("Item ID: " + results[x].item_id + " " + " Product Name: " + results[x].product_name + " " + " Price: $" + results[x].price + ", (" + results[x].stock_quantity + " in stock)");

            console.log("\nItem ID: " + results[x].item_id + " " + " Product Name: " + results[x].product_name + " " + " Price: $" + results[x].price + ", (" + results[x].stock_quantity + " in stock)\n")
        }
        return choiceArray2;
    })
}

function displayHome() {
    console.clear();

    connection.query("SELECT * FROM products WHERE department_name = \"home\"", function (err, results) {
        if (err) throw err;
        var choiceArray3 = [];
        for (var j = 0; j < results.length; j++) {
            choiceArray3.push("Item ID: " + results[j].item_id + " " + " Product Name: " + results[j].product_name + " " + " Price: $" + results[j].price + ", (" + results[j].stock_quantity + " in stock)");

            console.log("\nItem ID: " + results[j].item_id + " " + " Product Name: " + results[j].product_name + " " + " Price: $" + results[j].price + ", (" + results[j].stock_quantity + " in stock)\n")
        }
        return choiceArray3;
    })
}

function displayBeauty() {
    console.clear();

    connection.query("SELECT * FROM products WHERE department_name = \"beauty\"", function (err, results) {
        if (err) throw err;
        var choiceArray4 = [];
        for (var h = 0; h < results.length; h++) {
            choiceArray4.push("Item ID: " + results[h].item_id + " " + " Product Name: " + results[h].product_name + " " + " Price: $" + results[h].price + ", (" + results[h].stock_quantity + " in stock)");

            console.log("\nItem ID: " + results[h].item_id + " " + " Product Name: " + results[h].product_name + " " + " Price: $" + results[h].price + ", (" + results[h].stock_quantity + " in stock)\n")
        }
        return choiceArray4;

    })
}

function displayElecs() {
    console.clear();

    connection.query("SELECT * FROM products WHERE department_name = \"electronics\"", function (err, results) {
        if (err) throw err;
        var choiceArray5 = [];
        for (var d = 0; d < results.length; d++) {
            choiceArray5.push("Item ID: " + results[d].item_id + " " + " Product Name: " + results[d].product_name + " " + " Price: $" + results[d].price + ", (" + results[d].stock_quantity + " in stock)");

            console.log("\nItem ID: " + results[d].item_id + " " + " Product Name: " + results[d].product_name + " " + " Price: $" + results[d].price + ", (" + results[d].stock_quantity + " in stock)\n")
        }
        return choiceArray5;
    })
}

function askAgain() {
    inquirer
        .prompt([{
            type: "list",
            name: "restartOrNa",
            message: "Would you like to keep shopping or leave my store?",
            choices: ["keep shopping", "leave"]
        }]).then(function (tellMe) {

            switch (tellMe.restartOrNa) {
                case "keep shopping":
                    console.clear();
                    startFirst();
                    break;
                case "leave":
                    console.log("Thanks for shopping, come again.");
                    connection.end();
                    break;
            }
        })
}