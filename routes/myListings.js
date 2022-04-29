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

  return router;
};
