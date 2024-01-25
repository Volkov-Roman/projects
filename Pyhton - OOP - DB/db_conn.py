from pathlib import Path
import sqlite3
import sys

class DB:
    @staticmethod
    def readFile(filename: str) -> str:
        content: str = ''
        try:
            file = open(filename, 'r', encoding='utf-8')
            content = file.read()
            file.close()
        except:
            print(f'Failed to read {filename} file.')
            sys.exit(-1)
        return content
    
    #Initialisation of the database using setup.sql
    @staticmethod
    def initializeDB() -> None:
        script: str = DB.readFile('setup.sql')
        cursor = DB_CONN.cursor()
        cursor.executescript(script)
        DB_CONN.commit()
        cursor.close()
        return None

DB_FILEPATH = Path().joinpath('p3_notes.db')
DB_CONN = sqlite3.connect(DB_FILEPATH)  #DB connection object
