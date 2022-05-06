INSERT INTO items (id, seller_id, title, price, description, photo_url, is_available, is_featured)
VALUES
  (1, 1, 'Lighthouse in Santa Cruz', 15, 'Cool Lighthouse in Santa Cruz', 'https://images.pexels.com/photos/1532771/pexels-photo-1532771.jpeg',  TRUE, TRUE),
  (2, 1, 'White and Black Lighthouse', 20, 'Cool White and Black Lighthouse Near the Cliff and White and Red House', 'https://images.pexels.com/photos/67235/lighthouse-beacon-light-house-direction-67235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',TRUE, FALSE),
  (3, 1, 'Red and White Lighthouse', 13, 'Cool Red and White Lighthouse','https://images.pexels.com/photos/1105382/pexels-photo-1105382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, TRUE),
  (4, 2, 'Howth Harbour Lighthouse in Ireland', 20, 'Cool Howth Harbour Lighthouse in Ireland', 'https://images.pexels.com/photos/10878684/pexels-photo-10878684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, FALSE),
  (5, 2, 'Lighthouse glowing on starry sky', 18, 'Cool Lighthouse glowing on starry sky', 'https://images.pexels.com/photos/4954713/pexels-photo-4954713.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, TRUE),
  (6, 3, 'Lighthouse Beside Palm Tree on Islet', 25, 'Cool Lighthouse Beside Palm Tree on Islet', 'https://images.pexels.com/photos/333528/pexels-photo-333528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, FALSE),
  (7, 3, 'Lighthouse with birds', 14, 'Cool Lighthouse with birds', 'https://images.pexels.com/photos/2501968/pexels-photo-2501968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, FALSE),
  (8, 4, 'Lighthouse on Top of Limestone Rock Formation Overlooking Sea', 18, 'Cool Lighthouse on Top of Limestone Rock Formation Overlooking Sea', 'https://images.pexels.com/photos/9959286/pexels-photo-9959286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, FALSE),
  (9, 4, 'Split Rock Lighthouse on the Edge of a Mountain', 20, 'Cool Split Rock Lighthouse on the Edge of a Mountain', 'https://images.pexels.com/photos/5064716/pexels-photo-5064716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', TRUE, FALSE),
  (10, 5, 'Best Code Consultant', 259, 'This top tier code consultant will be your best friend when finding bugs and tpyoes, and sure loves lighthouses!', 'https://i.imgur.com/arwp4sX.jpg?1', TRUE, TRUE),
  (11, 5, 'Lighthouse Pennant', 8000, 'Featured in the 2019 film, ''The Lighthouse'', proceeds go to charity!', 'https://i.imgur.com/BFTLSiR.jpg?1', TRUE, TRUE),
  (12, 4, 'Coziest Hoodie (L)', 30, 'You''ll be comfortable and stylish in this hoodie! Unisex size L.', 'https://imgur.com/o2eolos.jpg?1', TRUE, TRUE),
  (13, 4, 'Coziest Hoodie (M)', 30, 'You''ll be comfortable and stylish in this hoodie! Unisex size M.', 'https://imgur.com/EbTaZFI.jpg?1', TRUE, TRUE),
  (14, 5, 'Crochet Lighthouse Decoration', 20, 'Lovingly made by my gran! Perfect company for when you need a bright idea.', 'https://imgur.com/gh7HCt7.jpg?1', TRUE, FALSE),
  (15, 1, 'Ceramic Lighthouse Tealight Holder', 5, 'Gently used, minor chip on bottom, final sale.', 'https://imgur.com/Otg1KDa.jpg?1', TRUE, FALSE),
  (16, 2, 'Night Lights', 15, 'Brand new! Like the real thing! Instead of ships in the harbor they protect your toes in the hallway.', 'https://i.imgur.com/OCCBQKs.jpg?1', TRUE, FALSE);

SELECT setval('items_id_seq', 16);
