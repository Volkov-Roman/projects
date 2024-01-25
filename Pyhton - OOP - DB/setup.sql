CREATE TABLE IF NOT EXISTS note(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now')),
  user_id INTEGER,
  FOREIGN KEY (user_id) REFERENCES user (id),
  UNIQUE (user_id, title) 
);

CREATE TABLE IF NOT EXISTS user(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at INTEGER DEFAULT (strftime('%s', 'now')),
  updated_at INTEGER DEFAULT (strftime('%s', 'now'))
);

INSERT OR IGNORE INTO user (name, password) VALUES ('demo_user', '5c90b96a75d4f9d5a1cfaa6f532afdc8');