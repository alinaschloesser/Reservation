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
        name: "Alina Maria",
        phoneNumber: "760-123-4567",
        email: "alina@outlook.com",
        uniqueID: 333
    }
];

var waitList = [{
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
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Get all characters
// app.get("/all", function(req, res) {
//     res.json(characters);
// });

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:tables?", function(req, res) {
    var chosen = req.params.tables;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < tables.length; i++) {
            if (chosen === tables[i].routeName) {
                return res.json(tables[i]);
            }
        }
        return res.json(false);
    }
    return res.json(tables);
});

app.get("/api/:waitList?", function(req, res) {
    var chosen = req.params.waitList;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < waitList.length; i++) {
            if (chosen === waitList[i].routeName) {
                return res.json(waitList[i]);
            }
        }
        return res.json(false);
    }
    return res.json(tables);
});

// Create New Characters - takes in JSON input
app.post("/api/new", function(req, res) {
    var newcharacter = req.body;
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
});

app.listen(process.env.PORT || PORT, function() {
    console.log("App listening on PORT " + PORT);
});