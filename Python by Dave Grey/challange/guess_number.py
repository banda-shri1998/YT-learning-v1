import random
from enum import Enum
import sys


def guess_number(name="PlayerOne"):
    import arcade

    game_count = 0
    player_wins = 0
    winning = 0

    def play_game():

        nonlocal name
        nonlocal player_wins
        print(f"welcome to Guess the number Game {name}")
        playerChoice = input(f"\n{name}, Enter ....1,2,3\nEnter choice :")
        if playerChoice.isalpha():
            print("Invalid input")
            return play_game()
        player = int(playerChoice)
        if playerChoice not in ["1", "2", "3"]:
            print(f"{name}, You Entered Wrong input\n Try with 1,2,3")
            return play_game()

        computerChoice = random.choice("123")
        computer = int(computerChoice)

        print(f"\n{name} chose {player}")

        def gameResult(player, computer):
            nonlocal player_wins
            if player == computer:
                player_wins += 1
                print(f"\n{name} guessed correct!")
            else:
                print(f"\nComputer wins! Sorry, {name}")

        nonlocal game_count
        game_count += 1
        gameResult(player, computer)
        print(f"\nPlayed {game_count} times\t{name} won {player_wins} times")
        nonlocal winning
        winning = (player_wins / game_count) * 100
        print(f"winning Percentage: {winning:.2f}%")

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
            if __name__=='__main__':
                sys.exit(f'Bye {name}')
            else:
                return arcade.menu(name)

    return play_game()


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
    guess = guess_number(args.name)
    guess()
