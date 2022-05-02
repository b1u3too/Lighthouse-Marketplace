const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show all the seller's message(logged in as a seller?)
  router.get("/", (req, res) => {

   let queryString = `
    SELECT messages.*, users.name AS placeholder_name
    FROM messages
    JOIN items ON item_id = items.id
    JOIN users ON user_id = users.id
    WHERE items.seller_id = $1
    `;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const messages = data.rows;
        res.render("mymessages", {messages: messages});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // showing all the buyer's messages(loggein in as a seller)
  router.get("/:buyerId/buyer", (req, res) => {

    let queryString = `
     SELECT messages.*, users.name AS placeholder_name
     FROM messages
     JOIN items ON item_id = items.id
     JOIN users ON user_id = users.id
     WHERE items.seller_id = $1
     AND messages.user_id IN ($1, $2)
     `;

     const queryParams = [req.session.user_id, req.params.buyerId]

     db.query(queryString, queryParams)
       .then(data => {
         const messages = data.rows;
         res.render("mymessages", {messages: messages});
       })
       .catch(err => {
         res
           .status(500)
           .json({ error: err.message });
       });
   });

  // showing all the buyer's messages (when logged in as buyer?)
  router.get("/:sellerId/seller", (req, res) => {

    let queryString = `
     SELECT messages.*, users.name AS placeholder_name
     FROM messages
     JOIN items ON item_id = items.id
     JOIN users ON user_id = users.id
     WHERE items.seller_id = $2
     AND messages.user_id IN ($1, $2)
     `;

     const queryParams = [req.session.user_id, req.params.sellerId]

     db.query(queryString, queryParams)
       .then(data => {
         const messages = data.rows;
         res.render("mymessages", {messages: messages});
       })
       .catch(err => {
         res
           .status(500)
           .json({ error: err.message });
       });
   });

  // add new message
  router.post("/", (req, res) => {

   });

  return router;
};
