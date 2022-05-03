const express = require('express');
const router  = express.Router();

const getNameFromID = function(userId, db) {

const queryString = `SELECT users.name FROM users
    WHERE id = $1 `;
const queryParams = [userId];

db.query(queryString, queryParams)
  .then(name => {
    return name;
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
}

const getConversationPartners = function(userId, arrayOfMessages, db) {
  const people = [];

  for (const message of arrayOfMessages) {
    const sendId = message.sender_id;
    const receiveId = message.receiver_id;

    if (sendId !== userId && !people.includes(sendId)) {
      people.push({ id: sendId, name: getNameFromID(sendId, db) });
    }

    if (receiveId !== userId && !people.includes(receiveId)) {
      people.push(receiveId);
    }
  }

  return people;
}

module.exports = (db) => {

  // show all the seller's message(logged in as a seller?)
  router.get("/", (req, res) => {

   let queryString = `
    SELECT messages.*, users.name AS placeholder_name
    FROM messages
    JOIN items ON item_id = items.id
    JOIN users ON sender_id = users.id
    WHERE messages.sender_id = $1 OR
    messages.receiver_id = $1
    GROUP BY messages.id, users.name, messages.sender_id, messages.receiver_id
    `;

    db.query(queryString,[req.session.user_id])
      .then(data => {
        const messages = data.rows;
        console.log(messages);
        //SCIENCE TOWN
        const messageFeeds = getConversationPartners(req.session.user_id, messages, db);
        console.log(messageFeeds);
        //END OF SCIENCE TOWN
        res.render("mymessages", { messageFeeds });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // showing all the buyer's messages(loggein in as a seller)
  router.get("/:buyerId/", (req, res) => {
    console.log(req.params.id);
    let queryString = `
    SELECT * FROM messages
    WHERE sender_id = (SELECT sender_id FROM messages WHERE sender_id = $1 ORDER BY created_at DESC FETCH FIRST ROW ONLY) AND receiver_id = (SELECT receiver_id FROM messages WHERE sender_id = $1 ORDER BY created_at DESC FETCH FIRST ROW ONLY) OR sender_id = (SELECT receiver_id FROM messages WHERE sender_id = $1 ORDER BY created_at DESC FETCH FIRST ROW ONLY) AND receiver_id = (SELECT sender_id FROM messages WHERE sender_id = $1 ORDER BY created_at DESC FETCH FIRST ROW ONLY);
     `;

     const queryParams = [req.params.buyerId]

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

  // // showing all the buyer's messages (when logged in as buyer?)
  // router.get("/:sellerId/seller", (req, res) => {

  //   let queryString = `
  //    SELECT messages.*, users.name AS placeholder_name
  //    FROM messages
  //    JOIN items ON item_id = items.id
  //    JOIN users ON user_id = users.id
  //    WHERE items.seller_id = $2
  //    AND messages.user_id IN ($1, $2)
  //    `;

  //    const queryParams = [req.session.user_id, req.params.sellerId]

  //    db.query(queryString, queryParams)
  //      .then(data => {
  //        const messages = data.rows;
  //        res.render("mymessages", {messages: messages});
  //      })
  //      .catch(err => {
  //        res
  //          .status(500)
  //          .json({ error: err.message });
  //      });
  //  });

  // add new message
  router.post("/", (req, res) => {

   });

  return router;
};
