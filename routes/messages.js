const express = require('express');
const router  = express.Router();
const dayjs = require('dayjs');

module.exports = (db) => {

  // show all the incoming messages
  router.get("/", (req, res) => {

   let queryString = `
   SELECT messages.id, users.id AS sender_id, users.name AS sender_name, users.email, users.phone, items.title AS inquiry_about, messages.created_at, messages.body
   FROM messages
   JOIN users on sender_id = users.id
   JOIN items on item_id = items.id
   WHERE receiver_id = $1
   ORDER BY sender_name, created_at ASC;
    `;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const messages = data.rows.map(message => {
          return {...message, created_at: dayjs(message.created_at).format('MMMM D, YYYY h:mm A')}
        });

        res.render("mymessages", { messages });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // show message history with the sender
  router.get("/message/:id", (req, res) => {
    let queryString = `
    SELECT users.name AS sender_name, users.id AS sender_id, messages.item_id AS item_id, items.title AS inquiry_about, messages.created_at, messages.body, users.email, users.phone
    FROM messages
    JOIN users on sender_id = users.id
    JOIN items on item_id = items.id
    WHERE (sender_id = (SELECT sender_id FROM messages WHERE id = $1)
      AND receiver_id = (SELECT receiver_id FROM messages WHERE id = $1))
    OR (sender_id = (SELECT receiver_id FROM messages WHERE id = $1)
      AND receiver_id = (SELECT sender_id FROM messages WHERE id = $1))
    `;

    db.query(queryString,[req.params.id])
      .then(data => {
        const messages = data.rows.map(message => {
          return {...message, created_at: dayjs(message.created_at).format('MMMM D, YYYY h:mm A')}
        });
        res.render("message_history", {messages: messages});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


  // add new message from item_details
  router.post("/", (req, res) => {
    let queryString = `
    INSERT INTO messages(sender_id, receiver_id, item_id, body)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `
    let queryParams = [req.session.user_id, req.body.receiver_id, req.body.item_id, req.body.message];

    db.query(queryString,queryParams)
    .then(data => {
      const messages = data.rows;
      res.redirect("/");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })

  return router;
};
