from db_conn import DB_CONN, DB
from menu_main import MenuMain

class Main():
    def __init__(self) -> None:
        print('Program starting.') 
        # 1. initialize
        DB.initializeDB()
        main_menu = MenuMain()
        # 2. run
        main_menu.activate()
        # 3. cleanup
        DB_CONN.close()
        print('\nProgram ending.') 
        return None
    
if __name__ == '__main__':
    app = Main()