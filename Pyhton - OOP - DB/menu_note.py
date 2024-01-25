from base_menu import Option, BaseMenu
from kirje import Kirje, KirjeDetails
from model_note import Note, NoteDAO
import states

#Submenu
class MenuNote(BaseMenu):
    def __init__(self) -> None:
        super().__init__(
            [Option("List notes", self.listNotes),
            Option("View note", self.viewNote),
            Option("Add note", self.addNote), 
            Option("Edit note", self.editNote), 
            Option("Delete note", self.deleteNote)],
            title = f"User '{states.current_user_name}' options", 
            submenu = True, close = "0 - Logout")
        return None
    
    def listNotes(self) -> None:
        notes: list[Note] = NoteDAO.readNote()
        if len(notes) >= 1:
            rows: list[str] = []
            for note in notes:
                rows.append(f'{notes.index(note) + 1} - {note.title}')
            memo_content: str = '\n'.join(rows)
            memo_list_details = KirjeDetails(
                content = memo_content,
                header_separation = ' - ',
                headers = {
                    'ID': 'Title',
                    'title': ' notes '
                }
            )
            memo_list = Kirje(memo_list_details)
            memo_list.display('streamlined')
            rows.clear()
        else:
            print('There are no notes.')
        return None
    
    def viewNote(self) -> None:
        inserted_title: str = input('Search note by title: ')
        note: Note | None = NoteDAO.viewNote(inserted_title)
        if note:
            memo_details = KirjeDetails(
                note.content, 
                headers = {
                    'ID': note.id,
                    'title': note.title
                }
            )
            current_memo = Kirje(memo_details)
            current_memo.display('default')
        else:
            print('Not found.')
        return None
    
    def addNote(self) -> None:
        inserted_title: str = input('Insert title: ')
        num_of_rows: int = int(input('Insert the amount of rows: '))
        rows: list[str] = []
        for i in range(num_of_rows):
            row: str = input(f'Insert row {i + 1}: ')
            rows.append(row)
        content: str = '\n'.join(rows)
        memo: Note = Note(len(NoteDAO.readNote()) + 1, inserted_title, content)
        NoteDAO.addNote(memo.title, memo.content)
        rows.clear()
        print('Note stored!')
        return None
    
    def editNote(self) -> None:
        inserted_title: str = input('Insert note title: ')
        note: Note | None = NoteDAO.viewNote(inserted_title)
        if note:
            rows: list[str] = note.content.split('\n')
            row_num: int = int(input(f'Insert row number to edit 1-{len(rows)}, 0 to cancel: ')) - 1
            if row_num == -1:
                print('Cancelled.')
            else:
                new_content: str = input('Insert replacement row: ')
                rows[row_num] = new_content
                note.content = '\n'.join(rows)
                NoteDAO.editNote(note)
                print('Edit completed!')
            rows.clear()
        else:
            print(f"'{inserted_title}' not found.")
        return None
    
    def deleteNote(self) -> None:
        inserted_title: str = input('Delete note (insert title): ')
        deleted_rows: int = NoteDAO.deleteNote(inserted_title)
        if deleted_rows == 1:
            print('Note deleted.')
        else:
            print(f"'{inserted_title}' not found.")
        return None