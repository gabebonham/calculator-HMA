INSERT INTO users (id, username, email, password, role, createdAt, updatedAt)
VALUES (
  gen_random_uuid(),
  'Cassiano',
  'cassiano@gmail.com',
  'Cassiano1234@',
  'admin',
  NULL,
  NOW(),
  NOW()
);

