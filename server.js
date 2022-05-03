// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require('cookie-session')

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(cookieSession({
  name: "session",
  keys: ["xxx"],
  maxAge: 24 * 60 * 60 * 1000
}))

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const itemsRoutes = require("./routes/items");
const favoritesRoutes = require("./routes/favorites");
const mylistingsRoutes = require("./routes/myListings");
const { query } = require("express");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
app.use("/api/items", itemsRoutes(db));
app.use("/api/favorites", favoritesRoutes(db));
app.use("/api/mylistings", mylistingsRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  let queryString = "SELECT * FROM items ";
  const [minCost, maxCost, orderBy]= [req.query['min-cost'], req.query['max-cost'], req.query['order-by']]
  const queryParams = [];

  queryString += `WHERE is_available = TRUE `;

  if (minCost) {
    queryParams.push(Number(minCost));
    queryString += `AND price >= $${queryParams.length} `
  }

  if (maxCost) {
    queryParams.push(Number(maxCost));
    console.log(queryParams);
    queryString += `AND price <= $${queryParams.length} `
  }

  queryString += `ORDER BY is_featured DESC`

  if (orderBy) {
    if (orderBy === 'ASC') {
      queryString += `, price ASC `
    } else {
      queryString +=  `, price DESC `
    }
  }

  console.log(queryString);
  db.query(queryString, queryParams)
  .then(data => {
    const items = data.rows;
    res.render("index", {items: items});
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
