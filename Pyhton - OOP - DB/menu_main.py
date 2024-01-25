import hashlib
from base_menu import Option, BaseMenu
from menu_note import MenuNote
from dao_user import UserDAO
import states

#Main menu
class MenuMain(BaseMenu):
    def __init__(self) -> None:
        super().__init__(
            options = [
                Option("Login", self.openNotesMenu),
                Option("Register", self.register)
            ])
        return None
    
    # 1 - Login
    def openNotesMenu(self) -> None:
        print("Insert credentials below:")
        username: str = input("Insert username: ")
        password: str = input("Insert password: ")
        md5_hash = hashlib.md5()
        md5_hash.update(password.encode('utf-8'))
        hashed_password: str = md5_hash.hexdigest()
        check_password = UserDAO.get_password(username)
        if check_password != None:
            check_password = check_password[0]
            if hashed_password == check_password:
                print("Authenticated!")
                states.current_user_name = username
                states.current_user_id = UserDAO.get_id(username)
                menu_note = MenuNote()
                print()
                menu_note.activate()
            else:
                print("Failed to authenticate!")
        return None
    
    # 2 - Registration
    def register(self) -> None:
        username: str = input("Insert username: ")
        username_check: str = self.checking("Username", username)
        if username_check != "":
             print(username_check)
        else:
            password1: str = input("Insert password: ")
            password_check: str = self.checking("Password", password1)
            if password_check != "":
                print(password_check)
            else:
                password2: str = input("Insert password again: ")
                if password1 == password2:
                    UserDAO.register(username, password1)
                    print("Registration completed!")
                else:
                    print("Passwords do not match!")
        return None
    
    #Checking the validity of the username/password
    @staticmethod
    def checking(for_check: str, inp: str) -> str:
        answer: str = ""
        allowed_characters: str = set("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-0123456789")
        if len(inp) < 4:
                answer = f"{for_check} must be minimum of '4' characters long."
        elif len(inp) > 10:
                answer = f"{for_check} must be maximum of '10' characters long."
        elif not all(char in allowed_characters for char in inp):
                answer = f"""{for_check} can only contain:
1. Lower case characters a-z
2. Upper case characters A-Z
3. Special characters: '_' and '-'"""
        elif for_check == "Username" and UserDAO.is_in_db(inp):
            answer = f"{for_check} already exists!"
        return answer