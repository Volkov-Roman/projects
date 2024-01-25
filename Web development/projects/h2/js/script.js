// Map
const map = [];
map[0] = "Old tower";
map[1] = "Well";
map[2] = "Sunny meadow";
map[3] = "By the castle";
map[4] = "Forest";
map[5] = "Ancient gate";
map[6] = "River";
map[7] = "Old wooden bench";
map[8] = "Distant cottage";
map[9] = "Alice's Shop";
map[10] = "Porridge kitchen";
map[11] = "Forester's Cabin";
map[12] = "Castle";

// Initialization
let mapLocation = 4; // Forest
dragon = true; // Is the dragon guarding the castle?
progress = 0; // plot progress bar

// Location images
const images = [];
images[0] = "torni.jpg";
images[1] = "kaivo.jpg";
images[2] = "aukio.jpg";
images[3] = "dragon.jpg";
images[4] = "polku.jpg";
images[5] = "portti.jpg";
images[6] = "joki.jpg";
images[7] = "penkki.jpg";
images[8] = "mokki.jpg";
images[9] = "kahvila.jpg";
images[10] = "kitchen.jpg";
images[11] = "cabin.jpg";
images[12] = "castle.jpg";

// Borders of the map
const blockMessage = [];
blockMessage[0] =
  "From the cliff, there is a captivating view of the raging sea. It's hardly a good idea to go in that direction on foot. ";
blockMessage[1] = "It's a little bit difficult to climb such a tall wall... ";
blockMessage[2] =
  "Ahead lie endless expanses of forest. There's hardly any point in going in that direction. ";
blockMessage[3] =
  "A dragon guards the castle. Just a few more steps, and you'll make an excellent dish for the Christmas table. ";
blockMessage[4] = "";
blockMessage[5] = "There's a dead end in this direction. ";
blockMessage[6] =
  "There's no bridge across the river in sight nearby. Moreover, on the other side, only an endless forest is visible. ";
blockMessage[7] =
  "In this direction, the forest becomes thick and dark. What if there are werewolves lurking there? ";
blockMessage[8] =
  "The roads are snowed in, and the snow is too deep to move in that direction. ";

// Hint system
const hint = [];
hint[0] = "Your mission is to get into the castle (location 'By the castle', west) ";
hint[1] = "Talk to the stranger at the location 'Well' ";
hint[2] = "Go to 'Distant cottage' and try to get into the forester's house ";
hint[3] = "Talk to Alice at the location 'Alice's Shop' (entrance through 'Ancient gate') ";
hint[4] = "Try to get to the kitchen at the location 'Old tower'. If it is closed, talk to the vagrant nearby ";
hint[5] = "It seems to be a perfect time for fishing at 'River'! If you don't have a fishing rod, one bird told me it can be found under the 'Old wooden bench' ";
hint[6] = "Talk to the cook ('Old tower', inside, talk)";
hint[7] = "We need candles to give them to the cook. If you haven't found them yet, I've heard that this man walks usually at 'Sunny meadow'. Then 'use' candles at 'Porridge kitchen' ";
hint[8] = "'Use' riisipuuro at 'Alice's shop' ";
hint[9] = "'Use' glogi at 'Distant cottage' ";
hint[10] = "Talk to the forester ('Distant cottage', inside, talk) ";
hint[11] = "Use salmiakki to distract the dragon and go into the castle ";

// Descriptions of the locations
const descript = [];
descript[0] = "A typical urban square with an old tower displaying a vibrant sign that reads 'Porridge kitchen'. The square is deserted, with only a lone vagrant strolling from corner to corner. ('inside' option is available) ";
descript[1] = "A narrow alley enclosed on one side by a tall wall. In the middle stands a well, at the base of which sits a stranger, engrossed in a map, carefully studying its details. ";
descript[2] = "A small pine grove. Sunbeams penetrate through the dense crowns of the trees. A delightful spot for a stroll! ";
descript[3] = "The outskirts of the city. To the west, a magnificent castle is visible, connected by a bridge. In this place, you sense the presence of a dragon. (The castle is on the west) ";
descript[4] = "A cozy forest path in the park amidst a small town. We arrived here (presumably by parachuting) to meet Joulupukki and find out our statistics of good deeds and screen time for the year. We know he's in this town. And we know he lives in a castle somewhere to the west. All that's left is to meet him face to face. ";
descript[5] = "The passage looks quite ancient. Beyond it lies a narrow dead-end where you spot a warmly inviting door to a coffee shop. ('inside' option is available)";
descript[6] = "A sunny meadow by the riverbank. The current is quite brisk. It makes you wonder, is there any fish swimming in these waters? ";
descript[7] = "The grove shields this part of the city from the sun. You walk past a melancholic-looking bench, overgrown with moss and covered in fallen leaves. ";
descript[8] = "Who would have thought that temperature difference within one small town could be so significant? Struggling through the snow, you notice a solitary cabin standing alone. ('inside' option is available)";
descript[9] = "A warm and cozy coffee shop. You are welcomed by the radiant smile of its owner - Alice. ";
descript[10] = "An industrial kitchen filled with the aroma of freshly cooked porridge. At the stove, stirring the bubbling contents of enormous pots, stands the cook. ";
descript[11] = "A cramped and slightly unpleasant-smelling shelter of the forester. The owner sits at the table and carves someone's carcass. In the corner, formless sacks filled with salmiakki lie scattered. ";
descript[12] = "Joulupukki: Hello, adventurer! I was starting to think you wouldn't get past my dragon. I see you've been nice throughout the year and deserve praise. Well done! Now you can close this browser tab. Merry Christmas, HO-HO-HO!";

let playersInput = "";
let gameMessage = "";

// Commands
const actionsForPlayer = [
  "north",
  "south",
  "west",
  "east",
  "inside",
  "outside",
  "seek",
  "talk",
  "use",
];
let action = "";

// Items presenting in the game
let items = { "candles": true, "fishing rod": true };
let backPack = [];
const knownItems = [
  "salmiakki",
  "glogi",
  "riisipuuro",
  "candles",
  "fishing rod",
];
let item = "";

// Interface elements
const image = document.querySelector("#img");
const input = document.querySelector("#input");
const output = document.querySelector("#output");
const buttonDo = document.querySelector("#do");
buttonDo.style.cursor = "pointer";
buttonDo.addEventListener("click", clickHandler, false);
document.addEventListener("keydown", handleKeyPress);

const buttonBP = document.querySelector("#inventory");
buttonBP.style.cursor = "pointer";
buttonBP.addEventListener("click", clickHandlerBP, false);

const buttonIns = document.querySelector("#instructions");
buttonIns.style.cursor = "pointer";
buttonIns.addEventListener("click", clickHandlerIns, false);

const buttonHint = document.querySelector("#hint");
buttonHint.style.cursor = "pointer";
buttonHint.addEventListener("click", clickHandlerHint, false);

render();

function render() {
  image.src = "images/" + images[mapLocation];
  output.innerHTML = "LOCATION: " + map[mapLocation] + "<br>" + descript[mapLocation] + "<br>" + "<br>";
  output.innerHTML += "<em>" + gameMessage + "</em>";
  input.value = "";
}

function clickHandler() {
  playGame();
}

function clickHandlerBP() {
  if (backPack.length > 0) {
    gameMessage = "Backpack: " + backPack.join(", ") + "<br>";
  } else {
    gameMessage = "You have no items in the backpack "
  }
  render();
}

function clickHandlerIns() {
  gameMessage = "Insert a command and click/press ENTER. Commands are followong:<br>north/west/south/east - navigation on the map<br>inside/outside - get into/out of a building in the location<br>use <item's name> - use the item in the location<br>seek - look for useful items in the location<br>talk - talk to a character in the location";
  render();
}

function clickHandlerHint() {
  gameMessage = hint[progress];
  render();
}

function handleKeyPress(event) {
  if (event.keyCode === 13) {
    playGame();
  }
}

function playGame() {
  playersInput = input.value.toLowerCase();

  // Reseting the variables just to be sure
  gameMessage = "";
  action = "";

  // Checking of the given command
  for (let i = 0; i < actionsForPlayer.length; i++) {
    if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
      action = actionsForPlayer[i];
      console.log("Pelaajan komento oli: " + action);
      break;
    }
  }

  for (let i = 0; i < knownItems.length; i++) {
    if (playersInput.indexOf(knownItems[i]) !== -1) {
      item = knownItems[i];
      console.log("Valitsit esineen: " + item);
    }
  }

  switch (action) {
    case "north":
      if (mapLocation < 9) {
        if (mapLocation >= 3) {
          mapLocation -= 3;
        } else {
          gameMessage = blockMessage[mapLocation];
        }
      } else {
        gameMessage = "There is no way. You should go outside first. ";
      }
      break;

    case "east":
      if (mapLocation < 9) {
        if (mapLocation % 3 !== 2) {
          mapLocation += 1;
        } else {
          gameMessage = blockMessage[mapLocation];
        }
      } else {
        gameMessage = "There is no way. You should go outside first. ";
      }
      break;

    case "south":
      if (mapLocation < 9) {
        if (mapLocation <= 5) {
          mapLocation += 3;
        } else {
          gameMessage = blockMessage[mapLocation];
        }
      } else {
        gameMessage = "There is no way. You should go outside first. ";
      }
      break;

    case "west":
      if (mapLocation == 3 && progress == 0) {
        gameMessage =
          "It seems like getting into the castle won't be that easy. You need to ask the locals how to get there. ";
        progress = 1;
        break;
      }
      if (mapLocation == 3 && dragon == false) {
        mapLocation = 12;
        break;
      }
      if (mapLocation < 9) {
        if (mapLocation % 3 !== 0) {
          mapLocation -= 1;
        } else {
          gameMessage = blockMessage[mapLocation];
        }
      } else {
        gameMessage = "There is no way. You should go outside first. ";
      }
      break;

    case "inside":
      switch (mapLocation) {
        case 0:
          if (progress >= 6) {
            mapLocation = 10;
          } else {
            gameMessage =
              "You tried to enter the tower, but you couldn't find an open door or any signs. ";
          }
          break;

        case 5:
          mapLocation = 9;
          break;

        case 8:
          if (progress == 2) {
            gameMessage =
              "You knocked on the door of the hut. In response, only a ringing silence. Perhaps the owner is not at home. Maybe in the town, you can find someone who knows him. ";
            progress = 3;
            break;
          }
          if (progress >= 10) {
            mapLocation = 11;
          } else {
            gameMessage =
              "You knocked on the locked door, but there was no response. ";
          }
          break;

        case 3:
          if (dragon === false) {
            mapLocation = 12;
          } else {
            gameMessage = blockMessage[mapLocation];
          }

        default:
          gameMessage = "There's nowhere to enter. ";
      }
      break;

    case "outside":
      switch (mapLocation) {
        case 9:
          mapLocation = 5;
          break;

        case 10:
          mapLocation = 0;
          break;

        case 11:
          mapLocation = 8;
          break;

        default:
          gameMessage = "You're already outside. ";
      }
      break;

    case "seek":
      seekItem();
      break;

    case "use":
      useItem();
      break;

    case "talk":
      switch (mapLocation) {
        case 0:
          talkVagrant();
          break;

        case 1:
          talkStranger();
          break;

        case 9:
          talkAlice();
          break;

        case 10:
          talkCook();
          break;

        case 11:
          talkForester();
          break;

        default:
          gameMessage = "Nobody to talk to here... Except maybe with oneself. ";
      }
      break;

    default:
      gameMessage = "Undefined command ";
  }

  render();
}

function seekItem() {
  if (mapLocation == 2 && items["candles"]) {
    gameMessage =
      "You scanned the crinkled leaves, and at the base of one pine tree, there lay something brightly red. " +
      "<br>" +
      "You've picked up: candles. ";
    backPack.push("candles");
    items["candles"] = false;
  } else if (mapLocation == 7 && items["fishing rod"]) {
    gameMessage =
      "On closer inspection beneath the bench, to your great surprise, you found a fairly new fishing rod. " +
      "<br>" +
      "You've picked up: fishing rod. ";
    backPack.push("fishing rod");
    items["fishing rod"] = false;
  } else {
    gameMessage =
      "You looked around carefully, but didn't find anything notable or particularly useful. ";
  }
}

function useItem() {
  let backPackIndexNumber = backPack.indexOf(item);
  if (backPack.length == 0) {
    gameMessage = "You have no item to use! ";
  } else if (backPackIndexNumber === -1) {
    gameMessage = "You don't have an " + item + " to use. ";
  }

  if (backPackIndexNumber !== -1) {
    switch (item) {
      case "fishing rod":
        if (mapLocation === 6) {
          if (progress == 5) {
            gameMessage =
              "How wonderful that there's time for fishing now! Enjoying the process, you didn't notice a couple of hours fly by. The kitchen must have opened by now! ";
            progress = 6;
          } else {
            gameMessage =
              "The desire to go fishing is indeed strong, but we don't have time for that right now. ";
          }
        } else {
          gameMessage =
            "This location doesn't seem to be a particularly fishy spot. ";
        }
        break;

      case "candles":
        if (mapLocation == 10 && progress == 7) {
          gameMessage =
            "You return the candles to the cook. He seems to be happy and gives you a bucket of riisipuuro. ";
          backPack.push("riisipuuro");
          backPack.splice(backPackIndexNumber, 1);
          progress = 8;
        } else {
          gameMessage =
            "It's hard to imagine what sensible thing you plan to do with them here. ";
        }
        break;

      case "glogi":
        if (mapLocation == 8) {
          gameMessage =
            "Approaching the door, you loudly announced that you brought a bottle of glogi as a gift. Immediately behind the door, there was a rustle, and the host opened the door, inviting you inside. ";
          backPack.splice(backPackIndexNumber, 1);
          progress = 10;
        } else {
          gameMessage =
            "Don't drink! It was not easy to get this bottle. We are bringing it to the forester. ";
        }
        break;

      case "riisipuuro":
        if (mapLocation === 9) {
          gameMessage = "You change riisipuuro for a bottle of glogi. ";
          backPack.splice(backPackIndexNumber, 1);
          backPack.push("glogi");
          progress = 9;
        } else {
          gameMessage = "We still need this porridge for other purposes. ";
        }
        break;

      case "salmiakki":
        if (mapLocation === 3) {
          gameMessage =
            "As soon as you pulled salmiakki out of your pocket, the dragon started staring at you without taking its eyes off. " +
            "You throw salmiakki into the gorge, and the dragon eagerly rushes after it. " +
            "Now you can get into the castle. ";
          backPack.splice(backPackIndexNumber, 1);
          dragon = false;
        } else {
          gameMessage = "This is intended for the dragon! ";
        }
        break;

      default:
        gameMessage = "";
    }
  }
}


// Dialogs
function talkVagrant() {
  switch (progress) {
    case 4:
      gameMessage =
        "Vagrant: The kitchen? You've come too early; it will only open in a couple of hours. Come closer to the evening. ";
      progress = 5;
      break;

    default:
      gameMessage =
        "Vagrant: Hello adventurer! Would you happen to have some spare change for a wanderer for food? ";
  }
}

function talkAlice() {
  switch (progress) {
    case 0:
    case 2:
      gameMessage =
        "Alice: Hello adventurer! You can find a wide range of drinks in my store! What would you like to buy? Oh? No money? Hmm... You know, there's not much I can help you with here. ";
      break;

    case 1:
      gameMessage =
        "Alice: The dragon? Hmm... Honestly I don't know. I've never had a need to get there. ";
      break;

    case 3:
      gameMessage =
        "Alice: The forester? He's quite a character. He just sits at home, never opening the door for anyone. Usually, when I need something from him, I bring him a bottle of glogi, and I get everything I want. But if you don't have money... You know, I'll give you glogi if you go to the kitchen, which is located in the old tower, and bring me some riisipuuro. Deal? ";
      progress = 4;
      break;

    case 9:
    case 10:
      gameMessage =
        "Alice: How are things going with the dragon? It seems you haven't succeeded yet. Good luck to you! ";
      break;

    default:
      gameMessage = "Alice: I'm looking forward for riisipuuro! ";
  }
}

function talkStranger() {
  switch (progress) {
    case 0:
      gameMessage =
        "Stranger: It seems I got lost. Don't you want to sit with me and take a look at this map? ";
      break;

    case 1:
      gameMessage =
        "Stranger: Actually I'm not a local. But I'm kind of expert of dragons. You need salmiakki to distract it from guarding. In our world, as it is known, foresters and hermits usually have the appropriate supplies. ";
      progress = 2;
      break;

    default:
      gameMessage =
        "Stranger: Such a lovely day, isn't it? It's nice to sit over there, but I do really wish to be at home. ";
  }
}

function talkForester() {
  if (progress == 10) {
    gameMessage =
      "Forester: You're such a great man! We're gonna to be bestfriends FO-RE-VER! Take as much salmiakki as you need! ";
    backPack.push("salmiakki");
    progress = 11;
  } else {
    gameMessage =
      "Forester: Make yourself at home, traveler. I won't refuse you anything. ";
  }
}

function talkCook() {
  switch (progress) {
    case 6:
      gameMessage =
        "Cook: I've just cooked a fresh riisipuuro! No money? Hmm... You know, I would give you as much riisipuuro as you want if you do me a small favor. During my daytime walk, I dropped Christmas candles somewhere. I'm sure they are lying somewhere in a prominent place; you just need to walk around the town. ";
      progress = 7;
      break;

    case 7:
      gameMessage =
        "Cook: Have you found my candles yet? No? Too bad... They should be somewhere in a prominent place... ";
      break;

    default:
      gameMessage =
        "Cook: Do you need more riisipuuro? I'm really grateful for your help! ";
  }
}
