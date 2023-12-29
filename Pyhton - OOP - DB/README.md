# Console Note-Taking Application in Python

This console application in Python allows users to take notes in an object-oriented style. It features user authentication and registration, utilizing the built-in `sqlite3` library for storing notes and user data. Passwords are encrypted using the `hashlib` library, and notes are displayed using the Kirje library (see "Requirements"). The development was done using MS Visual Studio Code (VS Code) IDE.

## Menu Structure

- **1 – Login**
  - 1.1 List notes
  - 1.2 View note
  - 1.3 Add note
  - 1.4 Edit note
  - 1.5 Delete note
  - 1.0 Logout

- **2 – Register**

- **0 – Exit**

## Database Structure

### Table "user"

| Field       | Type        | Description                                |
|-------------|-------------|--------------------------------------------|
| id          | INTEGER     | Primary Key                                |
| name        | TEXT        | Unique username                            |
| password    | TEXT        | Password hash                              |
| created_at  | INTEGER     | User creation time (timestamp)             |
| updated_at  | INTEGER     | Last user update time                      |

### Table "note"

| Field       | Type        | Description                                |
|-------------|-------------|--------------------------------------------|
| id          | INTEGER     | Primary Key                                |
| title       | TEXT        | Note title                                 |
| content     | TEXT        | Note content                               |
| created_at  | INTEGER     | Note creation time (timestamp)             |
| updated_at  | INTEGER     | Last note update time                      |
| user_id     | INTEGER     | Foreign Key linking to the "user" table    |

**Note:** A `UNIQUE (user_id, title)` constraint has been added to ensure the uniqueness of the combination of `user_id` and `title`.

