// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

var tables = [{
        routeName: "sarah",
        name: "Sarah",
        phoneNumber: "512-909-0000",
        email: "sarah@gmail.com",
        uniqueID: 123456
    },
    {
        routeName: "jose",
        name: "Jose",
        phoneNumber: "201-555-5555",
        email: "jose@yahoo.com",
        uniqueID: 12345678
    },
    {
        routeName: "alina",
        name: "Alina Morrill",
        phoneNumber: "760-123-4567",
        email: "alina@outlook.com",
        uniqueID: 333
    }
];

var waitlist = [{
    routeName: "thomas",
    name: "Thomas",
    phoneNumber: "972-333-3333",
    email: "thomas@hotmail.com",
    uniqueID: 1212
}];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/display/index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/display/reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "/app/display/tables.html"));
});

// Get all characters
// app.get("/all", function(req, res) {
//     res.json(characters);
// });

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:action?", function(req, res) {
    var action = req.params.action;

    switch (action) {
        case 'tables':
            res.json(tables);
            break;
        case 'waitlist':
            res.json(waitlist);
            break;

    }

    // if (chosen) {
    //     console.log(chosen);

    //     for (var i = 0; i < tables.length; i++) {
    //         if (chosen === tables[i].routeName) {
    //             return res.json(tables[i]);
    //         }
    //     }
    //     return res.json(false);
    // }
    return;
});
// app.get("/api/waitlist", function(req, res) {

//     // if (chosen) {
//     //     console.log(chosen);

//     //     for (var i = 0; i < waitlist.length; i++) {
//     //         if (chosen === waitlist[i].routeName) {
//     //             return res.json(waitlist[i]);
//     //         }
//     //     }
//     //     return res.json(false);
//     // }
//     return res.json(waitlist);
// });// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

    console.log(newReservation);

    if (tables.length < 5) {
        tables.push(newReservation);

    } else {
        waitlist.push(newReservation);
    }

    res.json(newReservation);
});



app.listen(process.env.PORT || PORT, function() {
    console.log("App listening on PORT " + PORT);
});