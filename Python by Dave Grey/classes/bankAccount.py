class BalanceException(Exception):
    pass


class BankAcc:
    def __init__(self, name, balance):
        self.name = name
        self.balance = balance

    def deposit(self, amt):
        self.balance = self.balance + amt
        self.getBalance()

    def getBalance(self):
        print(f"Balance:{self.balance}")

    def validTransaction(self, amt):
        if self.balance >= amt:
            return
        else:
            raise BalanceException(
                f'\nAccount "{self.name}" has only balance of {self.balance:.2f}'
            )

    def withdraw(self, amt):
        try:
            self.validTransaction(amt)
            self.balance = self.balance - amt
            self.getBalance()
        except BalanceException as error:
            print(f"Transaction Interrupted:{error}")

    def transfer(self, amt, account):
        try:
            self.validTransaction(amt)
            self.withdraw(amt)
            account.deposit(amt)
            print(
                f"Amount of {amt} has been transferred from {self.name} to {account.name} successfully"
            )
        except BalanceException as error:
            print(f"Transaction Interrupted:{error}")


class InterestAcc(BankAcc):
    def deposit(self, amt):
        self.balance = self.balance + (amt * 1.05)
        print(f"{amt} deposit Complete.")
        # 5% interest on deposit
        self.getBalance()


class SavingsAcc(InterestAcc):
    def __init__(self, name, balance):
        super().__init__(name, balance)
        self.fee = 5

    def withdraw(self, amt):
        try:
            self.validTransaction(amt)
            self.balance = self.balance - (amt + self.fee)
            print(f"{amt} Withdrawal Complete")
            self.getBalance()
        except BalanceException as error:
            print(f"Transaction Interrrupted : {error}")
