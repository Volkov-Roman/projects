An application for note-taking with a console interface in Python, utilizing an object-oriented style. It includes an interface for user authentication and registration. SQLite3 is employed for storing notes and user data (built-in library sqlite3). Passwords are encrypted using the built-in hashlib library. The Kirje library is used for displaying notes (see "requirements"). The development was conducted using MS Visual Studio Code (VS Code) IDE.

Menu structure:

menu_main
├── 1 – Login
│      └── menu_note
│ 	├── 1 - List notes
│ 	├── 2 - View note
│ 	├── 3 - Add note
│ 	├── 4 - Edit note
│ 	├── 5 - Delete note
│ 	└── 0 – Logout
├── 2 – Register
└── 0 – Exit
