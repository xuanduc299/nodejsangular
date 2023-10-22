// const express = require("express");
// const cors = require("cors");
// const bodyparser = require("body-parser");

// const app = express();
// app.use(express.static("public"));
// app.use(bodyparser.urlencoded({ extended: false }));
// app.use(bodyparser.json());
// app.use(cors({ origin: true, credentials: true }));

// const stripe = require("stripe")("sk_test_51O1KPVAQeKk7gSaxOnUzs459naU1D0LoBdag9cJssE0THkIXVicUVoF4DSdk3FVgHBQeaihoEtc7xaAQfOf2JOc30091usgRg0");

// app.post("/checkout", async (req, res, next) => {
//     try {
//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ['card'],
//             shipping_address_collection: {
//                 allowed_countries: ['US', 'CA'],
//             },
//             shipping_options: [
//                 {
//                     shipping_rate_data: {
//                         type: 'fixed_amount',
//                         fixed_amount: {
//                             amount: 0,
//                             currency: 'usd',
//                         },
//                         display_name: 'Free shipping',
//                         // Delivers between 5-7 business days
//                         delivery_estimate: {
//                             minimum: {
//                                 unit: 'business_day',
//                                 value: 5,
//                             },
//                             maximum: {
//                                 unit: 'business_day',
//                                 value: 7,
//                             },
//                         }
//                     }
//                 },
//                 {
//                     shipping_rate_data: {
//                         type: 'fixed_amount',
//                         fixed_amount: {
//                             amount: 1500,
//                             currency: 'usd',
//                         },
//                         display_name: 'Next day air',
//                         // Delivers in exactly 1 business day
//                         delivery_estimate: {
//                             minimum: {
//                                 unit: 'business_day',
//                                 value: 1,
//                             },
//                             maximum: {
//                                 unit: 'business_day',
//                                 value: 1,
//                             },
//                         }
//                     }
//                 },
//             ],
//             line_items: req.body.items.map((item) => ({
//                 price_data: {
//                     currency: 'usd',
//                     product_data: {
//                         name: item.name,
//                         images: [item.product]
//                     },
//                     unit_amount: item.price * 100,
//                 },
//                 quantity: item.quantity,
//             })),
//             mode: "payment",
//             success_url: "http://localhost:4242/success.html",
//             cancel_url: "http://localhost:4242/cancel.html",
//         });

//         res.status(200).json(session);
//     } catch (error) {
//         next(error);
//     }
// });

// app.listen(4242, () => console.log('app is running on 4242'));


const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());


//Establish the database connection

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "nodejs_angular",

});

db.connect(function (error) {
    if (error) {
        console.log("Error Connecting to DB");
    } else {
        console.log("successfully Connected to DB");
    }
});

//Establish the Port

server.listen(8085, function check(error) {
    if (error) {
        console.log("Error....dddd!!!!");
    }

    else {
        console.log("Started....!!!! 8085");

    }
});

//Create the Records

server.post("/api/student/add", (req, res) => {
    let details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee,
    };
    let sql = "INSERT INTO student SET ?";
    db.query(sql, details, (error) => {
        if (error) {
            res.send({ status: false, message: "Student created Failed" });
        } else {
            res.send({ status: true, message: "Student created successfully" });
        }
    });
});



//view the Records

server.get("/api/student", (req, res) => {
    var sql = "SELECT * FROM student";
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});


//Search the Records

server.get("/api/student/:id", (req, res) => {
    var studentid = req.params.id;
    var sql = "SELECT * FROM student WHERE id=" + studentid;
    db.query(sql, function (error, result) {
        if (error) {
            console.log("Error Connecting to DB");
        } else {
            res.send({ status: true, data: result });
        }
    });
});



//Update the Records

server.put("/api/student/update/:id", (req, res) => {
    let sql =
        "UPDATE student SET stname='" +
        req.body.stname +
        "', course='" +
        req.body.course +
        "',fee='" +
        req.body.fee +
        "'  WHERE id=" +
        req.params.id;

    let a = db.query(sql, (error, result) => {
        if (error) {
            res.send({ status: false, message: "Student Updated Failed" });
        } else {
            res.send({ status: true, message: "Student Updated successfully" });
        }
    });
});



//Delete the Records

server.delete("/api/student/delete/:id", (req, res) => {
    let sql = "DELETE FROM student WHERE id=" + req.params.id + "";
    let query = db.query(sql, (error) => {
        if (error) {
            res.send({ status: false, message: "Student Deleted Failed" });
        } else {
            res.send({ status: true, message: "Student Deleted successfully" });
        }
    });
});
