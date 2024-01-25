from abc import ABC, abstractmethod
from dataclasses import dataclass
import states
from typing import Callable

# Abstract class for creating menus

@dataclass
class Option:
    description: str
    action: Callable

class BaseMenu(ABC):
    options: list[Option]
    title: str
    prompt: str
    close: str
    
    @abstractmethod
    def __init__(self,
                 options: list[Option],
                 title: str = "Options",
                 prompt: str = "Your choice",
                 submenu: bool = False,
                 close: str = "") -> None:
        self.options = options
        self.title = title
        self.prompt = prompt + ": "
        if close == "":
            self.close = "0 - Back" if submenu == True else "0 - Exit"
        else:
            self.close = close
        return None
    
    def showOptions(self) -> None:
        print(self.title + ":")
        for i in range(len(self.options)):
            print(f'{i + 1} - {self.options[i].description}')
        print(self.close)
        return None
    
    def askChoice(self) -> int:
        self.showOptions()
        choice = int(-1)
        feed: str = input(self.prompt)
        if feed.isdigit():
            choice = int(feed)
        else:
            print("You need to insert an option's number")
        return choice
    
    def activate(self) -> None:
        choice: int = self.askChoice()
        while choice != 0:
            if 0 < choice <= len(self.options):
                index: int = choice - 1
                self.options[index].action()
            else:
                print("Unknown option, try again.")
            print()
            choice = self.askChoice()
        states.current_user_name = None
        states.current_user_id = None
        return None