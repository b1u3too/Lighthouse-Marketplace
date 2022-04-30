const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show a user's selling list
  router.get("/", (req, res) => {
    let queryString = `
    SELECT users.*, items.* FROM users
    LEFT JOIN items
    ON users.id = items.seller_id
    where users.id = $1`;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const listings = data.rows;
        console.log(listings)
        res.render("my-listings", {listings: listings});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // go to add new listing page
  router.get("/new", (req, res) => {
      res.render("new-listing");
  });

  // add new listing
  router.post("/", (req,res) => {
    let queryString = `
    INSERT INTO items(seller_id, title, price, description, photo_url)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
    `
    let queryParams = [req.session.user_id, req.body.title, req.body.price, req.body.description, req.body.photo_url]
    db.query(queryString,queryParams)
    .then(data => {
      const listings = data.rows;
      console.log(listings)
      res.redirect('/api/mylistings');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;
};
