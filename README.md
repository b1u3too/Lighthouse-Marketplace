Lighthouse Marketplace
=========
Lighthouse Marketplace is a simple web app where a user can list multiple items for sale, find the items you want to buy and easily contact sellers. It is built with HTML, CSS, SASS, JS, jQuery, Node and Express.

This is our first group project at LighthouseLabs and we learned how to develop an app as a team utilizing gitHub.

### Users can ...
- see featured items on a main feed
- filter items by price
- favorite items to check up on them later
- send messages to the seller that is listing the item
- post items, which can be seen by others
- remove items from the site
- mark items as SOLD!
- send a message to the buyer via app, email, or text

# Final Product
## Filtering by price
![filtering](https://user-images.githubusercontent.com/90123125/167050024-862d2df9-3e6a-44c7-a51c-5bdf4c051f2d.gif)
## My Listings
![mylisting](https://user-images.githubusercontent.com/90123125/167049373-fcfe64de-595e-44fb-9ceb-07c87d08bef4.gif)
## My Favourites
![favourite](https://user-images.githubusercontent.com/90123125/167049500-be749dac-76b6-4e21-ba87-d053c9726eb0.gif)

## Getting Started
1. Fork this repository and clone it onto your local device.
2. Install dependencies using the `npm install` command.
3. Set up a local the database in ![PostgreSQL](https://www.postgresql.org/download/) 
4. Connect to the database named midterm.
5. In the database, \i install the tables in the db/schema directory.
6. Next, \i install the seed data from the db/seeds directory.
4. Start the web server using the `npm run local` command.
5. The app will be served at <http://localhost:8080/>.
6. Go to <http://localhost:8080/> in your browser.

❗️For the purpose of the demo, we are ommiting user login/logout function.

❗️To login as a user1, please go to <http://localhost:8080/api/users/login/1> .

## Dependencies

- Node 10.x or above
- NPM 5.x or above
- Chalk　2.4.2　
- Cookie-session 2.0.0 
- Dayjs 1.11.1
- Dotenv 2.0.0
- EJS 3.1.7
- Express 4.17.1
- Morgan 1.9.1
- PG 8.5.0
- SASS 1.35.1
