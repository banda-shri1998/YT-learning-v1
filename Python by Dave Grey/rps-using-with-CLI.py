import sys
import random
import math
from enum import Enum


def play_rps(name="PlayerOne"):
    game_count = 0
    player_wins = 0
    python_wins = 0

    def play_game():
        class RPS(Enum):
            ROCK = 1
            PAPER = 2
            SCISSORS = 3

        nonlocal name

        playerChoice = input(
            f"\n{name}, Enter\n1 for Rockn\n2 for Paper\n3 for Scissors\nEnter choice :"
        )

        player = int(playerChoice)
        if player not in [1, 2, 3]:
            print(f"{name}, You Entered Wrong input\n Try with 1,2,3")
            return play_game()

        computerChoice = random.choice("123")
        computer = int(computerChoice)

        print(f"\n{name} chose {str(RPS(player)).replace("RPS.", "")}")
        print(f"\nComputer chose {str(RPS(computer)).replace("RPS.", "")}")

        def gameResult(player, computer):
            nonlocal player_wins
            nonlocal python_wins
            if player == 1 and computer == 3:
                player_wins += 1
                print(f"\nRock smashes scissors! {name} win!")
            elif player == 2 and computer == 1:
                player_wins += 1
                print(f"\nPaper covers rock! {name} win!")
            elif player == 3 and computer == 2:
                player_wins += 1
                print(f"\nScissors cuts paper! {name} win!")
            elif player == computer:
                print("\nit's a tie")
            else:
                python_wins += 1
                print(f"\nComputer wins! Sorry, {name}")

        nonlocal game_count
        game_count += 1
        gameResult(player, computer)
        print(f"\nplayed {game_count} times")
        print(f"\n{name} won {player_wins} times")
        print(f"\nComputer won {python_wins} times")

        print(f"\nWant to play again, {name}?")
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
            sys.exit(f"Bye, {name} !!")

    return play_game


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="adds Personal Gaming Experiece")
    parser.add_argument(
        "-n",
        "--name",
        metavar="name",
        required=True,
        help="Enter Your name after -n argument to start playing",
    )
    args = parser.parse_args()
    rps = play_rps(args.name)
    rps()
