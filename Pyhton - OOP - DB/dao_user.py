from dataclasses import dataclass
import hashlib
from db_conn import DB_CONN

#DAO (Data Access Object) user
@dataclass
class UserDAO:
    id: int
    name: str

    #Returns the hashed password from the database for the given username
    @staticmethod
    def get_password(name: str) -> str:
        cursor = DB_CONN.cursor()
        cursor.execute('SELECT password FROM user WHERE name = ?', (name,))
        password = cursor.fetchone()
        cursor.close()
        return password
    
    #Returns user's id for the given username
    @staticmethod
    def get_id(name: str) -> str:
        cursor = DB_CONN.cursor()
        cursor.execute('SELECT id FROM user WHERE name = ?', (name,))
        user_id = cursor.fetchone()
        cursor.close()
        return user_id[0]
    
    #User registration in the 'users' table of the database
    @staticmethod
    def register(name: str, password: str) -> None:
        md5_hash = hashlib.md5()
        md5_hash.update(password.encode('utf-8'))
        hashed_password: str = md5_hash.hexdigest()
        query: str = "INSERT INTO user(name, password) VALUES(?, ?);"
        try:
            cursor = DB_CONN.cursor()
            user_data: tuple[str] = (name, hashed_password)
            cursor.execute(query, user_data)
            DB_CONN.commit()
            cursor.close()
        except:
            print('Error while registration.')
        return None
    
    #Takes a username and returns True if such a user already exists in the database
    @staticmethod
    def is_in_db(name: str) -> bool:
        cursor = DB_CONN.cursor()
        cursor.execute('SELECT 1 FROM user WHERE name = ?', (name,))
        result = cursor.fetchone()
        cursor.close()
        return bool(result)
    
        