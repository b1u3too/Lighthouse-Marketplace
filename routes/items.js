const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show a specific item
  router.get("/:id", (req, res) => {
    let queryString = `
    SELECT items.*, users.name AS seller_name
    FROM items
    JOIN users ON seller_id=users.id
    WHERE items.id = $1;`;

    db.query(queryString,[req.params.id])
      .then(data => {
        const item = data.rows[0];
        res.render("item-detail", {item: item});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
