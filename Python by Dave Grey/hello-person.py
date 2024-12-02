def hello(name="User", lang="English"):
    greetings = {
        "English": "Hello",
        "Spanish": "Hola",
        "French": "Bonjour",
        "German": "Hallo",
        "Italian": "Ciao",
        "Chinese": "Nǐ hǎo",
    }
    print(f"{greetings[lang]} {name} !!")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Name of the Person to Greet")
    parser.add_argument(
        "-n", "--name", metavar="name", help="Please provide Your name", required=True
    )
    parser.add_argument(
        "-l",
        "--lang",
        metavar="language",
        help="Please provide Language among them \nEnglish \nSpanish \nFrench \nGerman \nItalian \nChinese",
    )
    args = parser.parse_args()
    # print(args)
    hello(args.name, args.lang)
