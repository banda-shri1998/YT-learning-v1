import sys
import random
import math
from enum import Enum


class RPS(Enum):
    ROCK = 1
    PAPER = 2
    SCISSORS = 3


playagain = True
while playagain:
    playerChoice = input(
        "\nEnter\n1 for Rockn\n2 for Paper\n3 for Scissors\nEnter choice :"
    )
    player = int(playerChoice)

    if player < 1 or player > 3:
        sys.exit("You Entered Wrong input\n Try with 1,2,3")

    computerChoice = random.choice("123")
    computer = int(computerChoice)

    print("\nYou chose " + str(RPS(player)).replace("RPS.", ""))
    print("\nComputer chose " + str(RPS(computer)).replace("RPS.", ""))

    if player == 1 and computer == 3:
        print("\nRock smashes scissors! You win!")
    elif player == 2 and computer == 1:
        print("\nPaper covers rock! You win!")
    elif player == 3 and computer == 2:
        print("\nScissors cuts paper! You win!")
    elif player == computer:
        print("\nit's a tie")
    else:
        print("\nComputer wins!")

    playagain = input(
        "\nPress 'Y' for continue playing\n Press Q to quit playing\nEnter Prompt: "
    )
    if playagain.lower() == "y":
        continue
    else:
        playagain = False
        print("\n!!! Thank you for Playing !!!")
        print("\nhave a good day")
