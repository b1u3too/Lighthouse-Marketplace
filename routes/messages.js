const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  // show all the incoming messages
  router.get("/", (req, res) => {

   let queryString = `
   SELECT users.name AS message_from, users.email, users.phone, items.title AS inquiry_about, messages.created_at, messages.body
   FROM messages
   JOIN users on sender_id = users.id
   JOIN items on item_id = items.id
   WHERE receiver_id = $1
   ORDER BY message_from, created_at ASC;
    `;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const messages = data.rows;
        console.log(messages);
        res.render("mymessages", { messages });
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
