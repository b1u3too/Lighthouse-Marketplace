const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show a user's favorite list
  router.get("/", (req, res) => {
   let queryString = `
    SELECT DISTINCT favorites.item_id, items.title, items.price, items.description, items.is_available, items.photo_url
    FROM favorites
    LEFT JOIN items
    ON favorites.item_id = items.id
    WHERE favorites.buyer_id = $1
    ORDER BY favorites.item_id;`;

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
    WHERE favorites.id = $1;`;

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

   // add an item to favorite list
   router.post('/:id', (req, res) => {
    let queryString = `
    INSERT INTO favorites (item_id, buyer_id)
    VALUES($1, $2)
    ON CONFLICT (item_id, buyer_id) DO NOTHING
    RETURNING *;`;

    db.query(queryString, [req.params.id, req.session.user_id])
      .then(data => {
        res.redirect('/api/favorites');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // remove an item from favorite list
  router.post('/:id/delete', (req, res) => {
    let queryString = `
    DELETE FROM favorites
    WHERE buyer_id = $1
    AND item_id = $2;`;

    db.query(queryString, [req.session.user_id, req.params.id])
      .then(data => {
        res.redirect('/api/favorites');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};

