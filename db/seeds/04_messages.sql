INSERT INTO messages (id, sender_id, receiver_id, item_id, created_at, body)
VALUES
  (1, 4, 1, 1, '2022-04-01 10:30:30', 'Hello I want to buy this lighthouse'),
  (2, 1, 3, 6, '2022-04-10 11:30:00', 'I will pay $10 for it'),
  (3, 4, 3, 7, '2022-04-11 20:30:00', 'Thank you!'),
  (4, 1, 4, 1, '2022-04-12 10:30:00', 'Sorry for my late reply Buyer 5! Still interested?'),
  (5, 4, 1, 1, '2022-04-12 10:35:00', 'Yes I am still interested!'),
  (6, 2, 1, 1, '2022-04-12 11:30:00', 'Hey! I wanna buy that lighthouse! Thanks! - Buyer 2'),
  (7, 1, 2, 1, '2022-04-12 11:50:00', 'Sorry someone else is interested in it.');

SELECT setval('messages_id_seq', 7);
