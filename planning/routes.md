## BREAD

### Users Table 
B GET   /users -------------------- Show all users (Probably won't need it this time?))<br>
R GET   /users/:user_id ----------- Show a specific user (Probably won't need it this time?) <br>
E POST  /users/:user_id ----------- Edit user info (contact>) (Probably won't need it this time?)<br>
A POST  /users -------------------- Add a new user (Probably won't need it this time?) <br>
D POST  /users/:user_id/delete ---- Delete a user (Probably won't need it this time?) <br>

### Items Table
B GET   /items --------------------- Show all items <br>
R GET   /items/:item_id ------------ Show a specific item <br>
E POST  /items/:item_id  ----------- Edit the item. Should be only available if you are the seller. <br>
A POST  /items --------------------- Add a new item<br>
D POST  /items/:item_id/delete ----- Delete an item Should be only available if you are the seller.<br>

### Favourites Table
B GET   /favorites ---------------------- Show all favorited items <br>
R GET   /favorites/:favorite_id ---------- Show a specific favorited item( redirect to item_id ? ) <br>
E POST  /favorites/:favorite_id  --------- Edit the favorited item (Should not be an option, if it's the seller redirect to item_id ?) <br>
A POST  /favorites ----------------------- Add a new favorite <br>
D POST  /favorites/:favorite_id/delete ---- Delete a favorite<br>


### Messages Table
B GET   /messages ------------------------ Show all messages  <br>
R GET   /messages/:message_id ------------ Show a specific message <br>
E POST  /messages/:message_id  ----------- Edit previous messages (Probably not this time?) <br>
A POST  /messages ---------------------- Add a new message <br>
D POST  /messages/:message_id/delete ------ Delete a message (Are we doing this?)<br>
