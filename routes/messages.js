const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show all the user's message
  router.get("/", (req, res) => {
   let queryString = `
    SELECT messages.*, users.name AS placeholder_name
    FROM messages
    JOIN items ON item_id = items.id
    JOIN users ON buyer_id = users.id
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

  // add new message
  router.post("/", (req, res) => {

   });

  return router;
};
