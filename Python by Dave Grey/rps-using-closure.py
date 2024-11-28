import sys
import random
import math
from enum import Enum


def play_rps():
    game_count = 0
    player_wins = 0
    python_wins = 0

    def play_game():
        class RPS(Enum):
            ROCK = 1
            PAPER = 2
            SCISSORS = 3

        playerChoice = input(
            "\nEnter\n1 for Rockn\n2 for Paper\n3 for Scissors\nEnter choice :"
        )

        player = int(playerChoice)
        if player not in [1, 2, 3]:
            print("You Entered Wrong input\n Try with 1,2,3")
            return play_game()

        computerChoice = random.choice("123")
        computer = int(computerChoice)

        print("\nYou chose " + str(RPS(player)).replace("RPS.", ""))
        print("\nComputer chose " + str(RPS(computer)).replace("RPS.", ""))

        def gameResult(player, computer):
            nonlocal player_wins
            nonlocal python_wins
            if player == 1 and computer == 3:
                player_wins += 1
                print("\nRock smashes scissors! You win!")
            elif player == 2 and computer == 1:
                player_wins += 1
                print("\nPaper covers rock! You win!")
            elif player == 3 and computer == 2:
                player_wins += 1
                print("\nScissors cuts paper! You win!")
            elif player == computer:
                print("\nit's a tie")
            else:
                python_wins += 1
                print("\nComputer wins!")

        nonlocal game_count
        game_count += 1
        gameResult(player, computer)
        print("\nplayed " + str(game_count) + " times")
        print("\nYou won " + str(player_wins) + " times")
        print("\nComputer won " + str(python_wins) + " times")

        print("\nWant to play again?")
        while True:
            playagain = input(
                "\nPress 'Y' for continue playing\n Press Q to quit playing\nEnter Prompt: "
            )
            if playagain.lower() not in ["y", "q"]:
                continue
            else:
                break
        if playagain.lower() == "y":
            return play_game()
        else:
            print("\n!!! Thank you for Playing !!!")
            print("\nhave a good day")
            sys.exit("Bye !!")

    return play_game


rps = play_rps()
rps()
