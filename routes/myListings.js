const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show a user's selling list
  router.get("/", (req, res) => {
    let queryString = `
    SELECT users.*, items.* FROM users
    LEFT JOIN items
    ON users.id = items.seller_id
    where users.id = $1
    ORDER BY items.id`;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const listings = data.rows;
        //console.log(listings);
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
      //console.log(listings);
      res.redirect('/api/mylistings');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  // delete an item from user's listing
  router.post('/:id/delete', (req, res) => {
    let queryString = `
    DELETE FROM items
    WHERE seller_id = $1
    AND id = $2;`;

    db.query(queryString, [req.session.user_id, req.params.id])
      .then(data => {
        res.redirect('/api/mylistings');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // go to edit listing page
  router.get('/:id/edit', (req, res) => {
    let queryString = `
    SELECT *
    FROM items
    WHERE id = $1;`;

    db.query(queryString,[req.params.id])
      .then(data => {
        const item = data.rows[0];
        res.render('edit-listing', {item: item});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });

  // edit a listing
  router.post('/:id/edit', (req, res) => {

    let queryString = `UPDATE items SET `;

    let queryParams = [];

    if(req.body.photo_url) {
      queryParams.push(req.body.photo_url);
      queryString += `photo_url = $${queryParams.length}, `;
    }

    if(req.body.title) {
      queryParams.push(req.body.title);
      queryString += `title = $${queryParams.length}, `;
    }

    if(req.body.description) {
      queryParams.push(req.body.description);
      queryString += `description = $${queryParams.length}, `;
    }

    if(req.body.price) {
      queryParams.push(req.body.price);
      queryString += `price = $${queryParams.length}, `;
    }

    queryString = queryString.slice(0, queryString.trim().length - 1);

    queryParams.push(req.params.id);
    queryString += `WHERE id = $${queryParams.length};`;

   db.query(queryString, queryParams)
      .then(data => {
        res.redirect('/api/mylistings');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //mark a listing as sold
  router.post('/:id/sold', (req, res) => {
    let queryString = `
    UPDATE items
    SET is_available = FALSE
    WHERE seller_id = $1
    AND id = $2;`;

    db.query(queryString, [req.session.user_id, req.params.id])
      .then(data => {
        res.redirect('/api/mylistings');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  return router;
};
