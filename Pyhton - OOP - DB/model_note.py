from dataclasses import dataclass
from db_conn import DB_CONN
import states

@dataclass
class Note:
    id: int
    title: str
    content: int

@dataclass
class NoteDAO:
    id: int
    title: str
    content: int

    @staticmethod
    def addNote(title: str, content: str) -> None:
        query: str = "INSERT INTO note (title, content, user_id) VALUES (?, ?, ?);"
        try:
            cursor = DB_CONN.cursor()
            note_data: tuple[str] = (title, content, states.current_user_id)
            cursor.execute(query, note_data)
            DB_CONN.commit()
            cursor.close()
        except:
            print('Error while inserting note.')
        return None
    
    #List notes
    @staticmethod
    def readNote() -> list[Note]:
        cursor = DB_CONN.cursor()
        query: str = 'SELECT * FROM note WHERE user_id = ?'
        cursor.execute(query, (states.current_user_id,))
        rows: list[tuple] = cursor.fetchall()
        cursor.close()
        notes: list[Note] = []
        for note in rows:
            notes.append(Note(note[0], note[1], note[2]))
        return notes
    
    @staticmethod
    def viewNote(title: str) -> Note | None:
        cursor = DB_CONN.cursor()
        query: str = 'SELECT * FROM note WHERE title = ? AND user_id = ?'
        note_data: tuple[str] = (title, states.current_user_id)
        cursor.execute(query, note_data)
        note: list[tuple] = cursor.fetchall()
        cursor.close()
        response: Note | None = None
        if note:
            response = Note(note[0][0], note[0][1], note[0][2])
        return response
    
    @staticmethod
    def editNote(note: Note) -> None:
        query: str = "UPDATE note SET content = ?, updated_at = strftime('%s', 'now') WHERE id = ?"
        edit_data: tuple[str, int] = (note.content, note.id)
        cursor = DB_CONN.cursor()
        cursor.execute(query, edit_data)
        DB_CONN.commit()
        cursor.close()
        return None
    
    @staticmethod
    def deleteNote(title: str) -> int:
        query: str = 'DELETE FROM note WHERE title = ? AND user_id = ?'
        delete_data: tuple[str] = (title, states.current_user_id)
        cursor = DB_CONN.cursor()
        cursor.execute(query, delete_data)
        DB_CONN.commit()
        deleted_rows: int = cursor.rowcount
        cursor.close()
        return deleted_rows


