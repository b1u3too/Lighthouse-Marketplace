const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show a user's favorite list
  router.get("/", (req, res) => {
   let queryString = `
    SELECT favorites.*, items.title, items.price, items.description
    FROM favorites
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

  //redirect to item detail page from a favorite id
  router.get("/:id", (req, res) => {
    let queryString = `
    SELECT favorites.item_id
    FROM favorites
    WHERE favorites.id = $1`;
    db.query(queryString,[req.params.id])
      .then(data => {
        const item_id = data.rows[0].item_id;
        //console.log(item_id)
        res.redirect(`http://localhost:8080/api/items/${item_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};