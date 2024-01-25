# Console Note-Taking Application in Python

An application for note-taking with a console interface in Python, utilizing an object-oriented style. It includes an interface for user authentication and registration. SQLite3 is employed for storing notes and user data (built-in library sqlite3). Passwords are encrypted using the built-in hashlib library. The Kirje library is used for displaying notes (see "requirements"). The development was conducted using MS Visual Studio Code (VS Code) IDE.

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

