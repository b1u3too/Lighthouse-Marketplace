## Question Log During Team Development
Q: Are we going to sell Lighthouses? :D We can add more filter depends on what we are going to sell!
A: Let's do it!

Q: Do we seperate user and admin? Like Nike shop? Admin -> Nike, customer -> users ? Or more like FB market and users can sell and buy? 
A: After talking to Taiwo, more likely that we'll go the Facebook Marketplace route of "users can both sell and buy"

Q: Do we need an an "admin table" that relates to the user table? 
A: Since admins won't have a lot of extra permissions compared to a user the ERD would be a 1-1 relationship, so we may as well have an "is_seller" boolean on the user instead of a separate table. So a person has to sign up as a user then... fill in extra or tick a box to become a "seller" -- we won't actually do that, just pretend it already happened with our seed data.

Q: Do we want to sell same multiple items? Need stock? Or each product is unique? 
A: Let's skip stock -- since it's mostly a "Facebook Marketplace-y" vibe.

Q: Are we going to create message page? Or just provide contact info? 
A: How about we put it as an textbox form a la' facebook messages. After talking with Taiwo, being able to text and email from the app seems beyond the scope of the project in two weeks. We could stretch if we want but can start with <a> tags that link to [phone numbers](https://blog.hubspot.com/website/html-telephone-link) and email.

Q: SPA or MPA ? 
A: How about MPA, pages
    Buyers Browsing Page (Featured loads first, filter/search options w/ cost at minimum)
    Buyer Individual Item Page (messaging) -- think like TinyApp
    Buyers's Favourites Page (like browse but better)
    Seller "my Listings" Page (Create new listing be a pop-out form? (JQuery)) - only shows if user is_seller, handle all CRUD functionality here?
    Seller Individual Item Page (All seller edit features need to be - messaging) -- think like TinyApp Edit Page

Q: MVD? What should we demo? 
A: We should talk about this together! Demo Script will be added to planning directory
