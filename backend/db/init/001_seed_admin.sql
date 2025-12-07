INSERT INTO users (email, password_hash, role, name)
VALUES (
  'admin@bip.com',
  '$2b$10$9H6OQZrG2d2d9878WuESses5njB7qQX2Ek.UD1/bNcY7yc77oEtcG',
  'admin',
  'Administrator'
)
ON CONFLICT (email) DO NOTHING;
