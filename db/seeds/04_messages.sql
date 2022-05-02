INSERT INTO messages (id, buyer_id, item_id, created_at, body)
VALUES
  (1, 5, 1, '2022-04-01 10:30:30', 'Hello I want to buy this lighthouse'),
  (2, 1, 6, '2022-04-10 11:30:00', 'I will pay $10 for it'),
  (3, 5, 7, '2022-04-11 20:30:00', 'Thank you!');

SELECT setval('messages_id_seq', 3);
