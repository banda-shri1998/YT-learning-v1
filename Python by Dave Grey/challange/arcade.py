import sys


def menu(name):
    from rps import play_rps
    from guess_number import guess_number

    playing = True
    print(f"\n{name}, Welcome to Arcade !")
    while playing:
        print(
            "\nPlease Choose a Game:\n1 = Rock Paper Scissors\n2 = Guess my Number\nor Press 'x' to Exit the arcade"
        )
        playagain = input("Enter your choice :")
        if playagain not in ["1", "2", "x"]:
            print("\n\nIncorrect Input:")
            playing = False
        if playagain == "1":
            return play_rps(name)
        elif playagain == "2":
            return guess_number(name)
        elif playagain == "x":
            print("\n!!! Thank you for Playing !!!")
            print("\nhave a good day")
            playing = False
        else:
            print("\n\nIncorrect Input:")
            playing = True


# menu("Shrinivas")
if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Play a game of Arcade")
    parser.add_argument("-n", "--name", metavar="Name", help="Name of the player")
    args = parser.parse_args()
    menu(args.name)
