const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show a specific item
  router.get("/", (req, res) => {
    let queryString = `
    SELECT favorites.*, items.* FROM favorites
    LEFT JOIN items
    ON favorites.item_id = items.id
    WHERE favorites.buyer_id = $1`;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const favorites = data.rows;
        //console.log(favorites)
        res.render("favorites", {favorites: favorites});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
