INSERT INTO favorites (id, item_id, buyer_id)
VALUES
  (1, 1, 5),
  (2, 3, 5);

SELECT setval('favorites_id_seq', 2);
